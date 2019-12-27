import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../../database/entities/article.entity';
import { ArticleVersion } from '../../database/entities/article-version.entity';
import { User } from '../../database/entities/user.entity';
import { Language } from '../../database/entities/languages.entity';
import { TranslationsModule } from '../translations/translations.module';

@Module({
  imports: [TypeOrmModule.forFeature([ Article, ArticleVersion, User, Language ]), TranslationsModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService],
})
export class ArticlesModule {}
