import {
  Controller,
  Post,
  Get,
  Body,
  ValidationPipe,
  Param,
  Patch,
  UseGuards,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { TranslationsService } from './translations.service';
import { TranslateToAllLanguagesDTO } from '../../models/translations/translate-to-all.dto';
import { UpdateTranslationDTO } from '../../models/translations/update-translation.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../database/entities/user.entity';
import { UserReq } from '../../common/decorators/user.decorator';
import { CreateRateDTO } from '../../models/translations/create-rate.dto';
import { ShowRateDTO } from '../../models/translations/show-rate.dto';
import { TransformInterceptor } from '../../common/transformer/interceptors/transform.interceptor';

@Controller('translations')
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Get()
  public async getAllTranslations(
    @Query('language') language: string,
  ) {
    return await this.translationsService.getAllTranslations(language);
  }

  @Get(':id')
  public async getTranslationById(
    @Param('id') translationId: number,
  ) {
    return await this.translationsService.getTranslationById(translationId);
  }

  @Post()
  public translate(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    body: TranslateToAllLanguagesDTO,
  ) {
    return this.translationsService.translateToAllLanguages(body);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  public async editTranslation(
    @Param('id') id: number,
    @Body(new ValidationPipe({whitelist: true, transform: true})) body: UpdateTranslationDTO,
    @UserReq() user: User,
    ) {
      return await this.translationsService.editTranslation(id, body, user);
  }

  @Post('rate')
  @UseInterceptors(new TransformInterceptor(ShowRateDTO))
  public async createRate(
    @Body(new ValidationPipe({whitelist: true, transform: true})) rating: CreateRateDTO,
  ): Promise<ShowRateDTO> {
    return await this.translationsService.createRate(rating);
  }

  @Get('/:translationId/rate')
  @UseInterceptors(new TransformInterceptor(ShowRateDTO))
  public async getRate(
    @Param('translationId') translationId: number,
  ): Promise<ShowRateDTO> {
    return await this.translationsService.getRate(translationId);
  }
}
