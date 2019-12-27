import {
  Controller,
  Post,
  Body,
  Patch,
  ValidationPipe,
  Get,
  Query,
  Delete,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { AddLanguageDTO } from '../../models/languages/add-language.dto';
import { UpdateLanguageDTO } from '../../models/languages/update-language.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TransformInterceptor } from '../../common/transformer/interceptors/transform.interceptor';
import { DetectionTextDTO } from '../../models/languages/detection-text-dto';
import { GoogleDetectionDTO } from '../../models/languages/google-detection.dto';
import { ShowLanguagesDTO } from '../../models/languages/show-language.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly langService: LanguagesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async getLanguages(
    @Query('language') language: string,
    @Query('all') all: boolean,
    @Query('allSupportedLang') allSupportedLang: boolean,
    @Query('active') active: boolean,
    ) {
    return await this.langService.getActiveLanguages(language, all, allSupportedLang, active);
  }

  @Post()
  @UseInterceptors(new TransformInterceptor(ShowLanguagesDTO))
  @UseGuards(AuthGuard('jwt'))
  public async addLanguage(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: AddLanguageDTO,
  ): Promise<ShowLanguagesDTO> {
    return await this.langService.addLanguage(body);
  }

  @Post('detect')
  @ApiBearerAuth()
  @UseInterceptors(new TransformInterceptor(GoogleDetectionDTO))
  @UseGuards(AuthGuard('jwt'))
  public async detectLanguage(
    @Body(new ValidationPipe({whitelist: true, transform: true})) detecteLang: DetectionTextDTO,
  ): Promise<GoogleDetectionDTO> {
    return await this.langService.detectLanguage(detecteLang);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(ShowLanguagesDTO))
  public async isActive(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: UpdateLanguageDTO,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ShowLanguagesDTO> {
    return await this.langService.changeActiveStatus(body, id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  public async delete(@Param('id', ParseIntPipe) langId: number) {
    return await this.langService.deleteLanguage(langId);
  }
}
