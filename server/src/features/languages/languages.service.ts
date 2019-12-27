import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from '../../database/entities/languages.entity';
import { Repository } from 'typeorm';
import { UpdateLanguageDTO } from '../../models/languages/update-language.dto';
import { AddLanguageDTO } from '../../models/languages/add-language.dto';
import { LingosSystemError } from '../../common/exceptions/lingo-system.error';
import { SupportedLanguagesEnum } from '../../common/enums/supported-languages.enum';
import * as GoogleTranslate from '@google-cloud/translate';
import { GoogleDetectionDTO } from '../../models/languages/google-detection.dto';
import { Translations } from '../../database/entities/translations.entity';
import { TranslationsService } from '../translations/translations.service';
import { User } from '../../database/entities/user.entity';
import { DetectionTextDTO } from '../../models/languages/detection-text-dto';
import { ShowLanguagesDTO } from '../../models/languages/show-language.dto';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private readonly langRepository: Repository<Language>,
    @InjectRepository(Translations)
    private readonly translationsRepository: Repository<Translations>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly translationsService: TranslationsService,
  ) {}

  public async getActiveLanguages(
    language?: string,
    all?: boolean,
    allSupportedLang?: boolean,
    active?: boolean,
  ) {
    if (allSupportedLang) {
      const supportedLanguages = await this.langRepository.find({
        where: { isDeleted: false },
      });
      return supportedLanguages;
    }

    if (active) {
      const supportedLanguages = await this.langRepository.find({
        where: { isDeleted: false, isActive: true },
      });
      return supportedLanguages;
    }

    if (language) {
      const found = await this.langRepository.findOne({ language });
      if ((found && found.isDeleted === true) || !found) {
        throw new LingosSystemError('Such language does not exist!', 404);
      }
      return found;
    }

    if (all) {
      const allLanguages = SupportedLanguagesEnum;
      return allLanguages;
    }
  }

  public async addLanguage(body: AddLanguageDTO): Promise<ShowLanguagesDTO> {
    const code = SupportedLanguagesEnum[body.language];
    if (!code) {
      throw new LingosSystemError(
        'The language you are trying to add is not supported!',
        400,
      );
    }

    const found = await this.langRepository.findOne({ language: code });
    if (found) {
      throw new LingosSystemError('This language already exists!', 400);
    }

    const articles = await this.translationsRepository.find({
      where: { targetLanguage: SupportedLanguagesEnum.English },
    });

    await this.translationsService.TranslateToSingleLanguage(articles, code);
    const lang: Language = this.langRepository.create({ language: code });
    const result = await this.langRepository.save(lang);
    return result;
  }

  public async changeActiveStatus(body: UpdateLanguageDTO, languageId: number): Promise<ShowLanguagesDTO> {
    const found = await this.findById(languageId);
    found.isActive = !found.isActive;
    const saved = await this.langRepository.save(found);
    if (!found.isActive) {
      await this.resetLanguagePreference(languageId);
    }
    return saved;
  }

  public async deleteLanguage(langId: number): Promise<{ msg: string }> {
    const found = await this.findById(langId);
    found.isDeleted = true;
    await this.langRepository.save(found);
    await this.resetLanguagePreference(langId);
    return { msg: 'Language deleted successfully!' };
  }

  public async detectLanguage(detectionText: DetectionTextDTO) {
    const translate = new GoogleTranslate.v2.Translate();
    const translationLanguages: GoogleDetectionDTO[] = await translate.detect(
      detectionText.text,
    );
    return translationLanguages.sort((a, b) => a.confidence - b.confidence)[0];
  }

  private async resetLanguagePreference(languageId: number): Promise<void> {
    const users: User[] = await this.userRepository.find({
      where: { preferredLanguage: languageId },
      relations: ['preferredLanguage'],
    });
    Promise.all(
      users.map(async user => {
        user.preferredLanguage = await Promise.resolve(null);
      }),
    );
    await this.userRepository.save(users);
  }

  private async findById(langId: number): Promise<Language> {
    const found: Language = await this.langRepository.findOne({ id: langId });
    if (!found || found.isDeleted === true) {
      throw new LingosSystemError('There is no such language!', 404);
    }
    return found;
  }
}
