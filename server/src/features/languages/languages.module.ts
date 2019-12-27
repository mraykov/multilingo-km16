import { Module } from '@nestjs/common';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from '../../database/entities/languages.entity';
import { Translations } from '../../database/entities/translations.entity';
import { TranslationsModule } from '../translations/translations.module';
import { User } from '../../database/entities/user.entity';

@Module({
  imports: [TranslationsModule, TypeOrmModule.forFeature([Language, Translations, User])],
  controllers: [LanguagesController],
  providers: [LanguagesService],
  exports: [LanguagesService],
})
export class LanguagesModule {}
