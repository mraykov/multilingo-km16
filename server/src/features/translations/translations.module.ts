import { Module } from '@nestjs/common';
import { TranslationsController } from './translations.controller';
import { TranslationsService } from './translations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Translations } from '../../database/entities/translations.entity';
import { Language } from '../../database/entities/languages.entity';
import { Rate } from '../../database/entities/rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Translations, Language, Rate])],
  controllers: [TranslationsController],
  providers: [TranslationsService],
  exports: [TranslationsService],
})
export class TranslationsModule {}
