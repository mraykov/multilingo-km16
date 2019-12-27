import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UiBlocksEntity } from '../../database/entities/ui-blocks.entity';
import { Repository } from 'typeorm';
import { AddUiBlockDTO } from '../../models/ui-blocks/add-ui-block.dto';
import { TranslationsService } from '../translations/translations.service';
import { TranslateToAllLanguagesDTO } from '../../models/translations/translate-to-all.dto';
import { SupportedLanguagesEnum } from '../../common/enums/supported-languages.enum';
import { TranslationTypeEnum } from '../../common/enums/translation-type.enum';
import { Translations } from '../../database/entities/translations.entity';
import { ShowBlockDTO } from '../../models/ui-blocks/show-block.dto';
import { LingosSystemError } from '../../common/exceptions/lingo-system.error';

@Injectable()
export class UiBlocksService {
  constructor(
    @InjectRepository(UiBlocksEntity)
    private readonly uiRepository: Repository<UiBlocksEntity>,
    @InjectRepository(Translations)
    private readonly translationsRepository: Repository<Translations>,
    private readonly translationService: TranslationsService,
  ) {}

  public async addNewBlock(body: AddUiBlockDTO) {
    const found = await this.uiRepository.findOne({ content: body.content });
    if (found) {
      return found;
    }
    const uiBlock = this.uiRepository.create(body);
    const translateBlock: TranslateToAllLanguagesDTO = {
      text: body.content,
      originLanguage: SupportedLanguagesEnum.English,
      type: TranslationTypeEnum.UI,
    };
    await this.translationService.translateToAllLanguages(translateBlock);
    return await this.uiRepository.save(uiBlock);
  }

  public async getLanguageSpecificBlock(language: string) {
    const uiBlocks = await this.uiRepository.find();
    const translated: any = await this.translationService.getArticlesTranslation(
      uiBlocks,
      language,
    );
    return translated;
  }

  public async updateBlock(block: AddUiBlockDTO): Promise<ShowBlockDTO> {
    const { key, content } = block;
    const found = await this.uiRepository.findOne({ where: { key } });
    found.content = content;
    const saved = await this.uiRepository.save(found);
    const translate: TranslateToAllLanguagesDTO = {
      text: saved.content,
      originLanguage: SupportedLanguagesEnum.English,
      type: TranslationTypeEnum.UI,
    };
    try {
      await this.translationService.translateToAllLanguages(translate);
      return saved;
    } catch (error) {
      throw new LingosSystemError(error, 400);
    }
  }
}
