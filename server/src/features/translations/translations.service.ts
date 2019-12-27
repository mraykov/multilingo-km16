import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Translations } from '../../database/entities/translations.entity';
import { Repository } from 'typeorm';
import * as GoogleTranslate from '@google-cloud/translate';
import { TranslateDTO } from '../../models/translations/translate.dto';
import { LingosSystemError } from '../../common/exceptions/lingo-system.error';
import { Language } from '../../database/entities/languages.entity';
import { TranslateToAllLanguagesDTO } from '../../models/translations/translate-to-all.dto';
import { UpdateTranslationDTO } from '../../models/translations/update-translation.dto';
import { TranslationSourceEnum } from '../../common/enums/translation-source.enum';
import { User } from '../../database/entities/user.entity';
import { Rate } from '../../database/entities/rate.entity';
import { CreateRateDTO } from '../../models/translations/create-rate.dto';
import { SupportedLanguagesEnum } from '../../common/enums/supported-languages.enum';
import { ArticleTranslationDTO } from '../../models/translations/article-translation.dto';
import { ShowTranslatedArticleDTO } from '../../models/articles/show-translated-article.dto';
import { ShowRateDTO } from '../../models/translations/show-rate.dto';
import { TranslationTypeEnum } from '../../common/enums/translation-type.enum';

@Injectable()
export class TranslationsService {
  constructor(
    @InjectRepository(Translations)
    private readonly translationsRepository: Repository<Translations>,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
    @InjectRepository(Rate)
    private readonly rateRepository: Repository<Rate>,
  ) {}

  public async getAllTranslations(language: string) {
    const translations: Translations[] = await this.translationsRepository.find(
      { targetLanguage: language || '' },
    );
    return translations;
  }

  public async getTranslationById(translationId: number) {
    const translation: Translations = await this.translationsRepository.findOne(
      { id: translationId },
    );
    if (!translation) {
      throw new LingosSystemError('There is no such translation', 400);
    }

    return translation;
  }

  public async getArticlesTranslation(
    articles: ArticleTranslationDTO[],
    language: string,
  ): Promise<ShowTranslatedArticleDTO[]> {
    const idx = language.indexOf('-');
    let code: string;
    if (idx < 0) {
      code = language;
    } else {
      code = language.slice(0, idx).toLocaleLowerCase();
    }

    const isExisting = await this.languageRepository.findOne({
      language: code,
      isActive: true,
      isDeleted: false,
    });
    if (!isExisting) {
      code = SupportedLanguagesEnum.English;
    }
    const translated: any = await Promise.all(
      (articles as any).map(async article => {
        if (article.title) {
          const title = await this.translationsRepository.findOne({
            where: { text: article.title, targetLanguage: code },
          });
          if (title.type === TranslationTypeEnum.UI) {
            article.title = title.translation;
          } else {
            article.title = { id: title.id, text: title.translation };
          }
          article.user = article.__author__.username;
        }
        const content = await this.translationsRepository.findOne({
          where: { text: article.content, targetLanguage: code },
        });
        if (content) {
          if (content.type === TranslationTypeEnum.UI) {
            article.content = content.translation;
          } else {
            article.content = { id: content.id, text: content.translation };
          }
          return article;
        }
      }),
    );
    return translated;
  }

  public async editTranslation(
    id: number,
    body: UpdateTranslationDTO,
    user: User,
  ) {
    const found = await this.translationsRepository.findOne({ id });
    if (found.targetLanguage === body.targetLanguage) {
      found.translation = body.text;
      found.editor = await Promise.resolve(user);
      found.source = TranslationSourceEnum.USER;
      return await this.translationsRepository.save(found);
    } else {
      throw new LingosSystemError('There is no such translation', 400);
    }
  }

  public async translateToAllLanguages(text: TranslateToAllLanguagesDTO) {
    const supportedLanguages = await this.languageRepository.find({
      select: ['language'],
    });
    if (supportedLanguages.length < 1) {
      throw new LingosSystemError(
        'Please add at least one foreign language!',
        400,
      );
    }
    const langArray = supportedLanguages.map(language => language.language);
    try {
      await Promise.all(
        langArray.map(async language => {
          const translate: TranslateDTO = { ...text, targetLanguage: language };
          await this.translate(translate);
        }),
      );
      return { msg: 'The text was translated to all supported languages!' };
    } catch (error) {
      throw new LingosSystemError('System could not translate the text', 400);
    }
  }

  public async TranslateToSingleLanguage(
    articles: TranslateDTO[],
    targetLanguage,
  ) {
    try {
      Promise.all(
        articles.map(async article => {
          const toTranslate: TranslateDTO = {
            text: article.text,
            originLanguage: article.originLanguage,
            type: article.type,
            targetLanguage,
          };
          await this.translate(toTranslate);
        }),
      );
    } catch (error) {
      throw new LingosSystemError('System could not translate the text', 400);
    }
  }

  public async createRate(rating: CreateRateDTO): Promise<ShowRateDTO> {
    const rate: Rate = this.rateRepository.create();
    const translation: Translations = await this.translationsRepository.findOne(
      { id: rating.translationId },
    );
    if (!translation) {
      throw new LingosSystemError('Not such translation found!', 404);
    }
    rate.rate = rating.rate;
    rate.translantion = Promise.resolve(translation);
    await this.rateRepository.save(rate);
    const ratings: Rate[] = await this.rateRepository.find({
      where: { translantion: await { id: translation.id } },
    });
    let countRate = 0;
    const sumRate = ratings.reduce((acc, rated) => {
      acc += rated.rate;
      countRate++;
      return acc;
    }, 0);
    const avgRate = sumRate / countRate;
    return { avgRate };
  }

  public async getRate(translationId: number): Promise<ShowRateDTO> {
    const translation: Translations = await this.translationsRepository.findOne(
      { id: translationId },
    );
    if (!translation) {
      throw new LingosSystemError('Not such translation found!', 404);
    }

    const ratings: Rate[] = await this.rateRepository.find({
      where: { translantion: { id: translation.id } },
    });
    let countRate = 0;
    const sumRate = ratings.reduce((acc, rated) => {
      acc += rated.rate;
      countRate++;
      return acc;
    }, 0);
    const avgRate = sumRate / countRate;
    return { avgRate };
  }

  private async translate(body: TranslateDTO) {
    const { text, targetLanguage, originLanguage } = body;
    const translate = new GoogleTranslate.v2.Translate();

    const isTranslated = await this.translationsRepository.findOne({
      where: { text, targetLanguage, originLanguage },
    });

    if (!isTranslated) {
      try {
        const [translated] = await translate.translate(text, targetLanguage);

        const textToSave = this.translationsRepository.create(body);
        textToSave.translation = translated;
        textToSave.source = TranslationSourceEnum.AUTO;
        await this.translationsRepository.save(textToSave);
      } catch (error) {
        throw new LingosSystemError(error, 400);
      }
    }
  }
}
