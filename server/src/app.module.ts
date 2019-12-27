import { Module } from '@nestjs/common';
import { UsersModule } from './features/users/users.module';
import { DatabaseModule } from './database/database.module';
import { CoreModule } from './common/core.module';
import { LanguagesModule } from './features/languages/languages.module';
import { ArticlesModule } from './features/articles/articles.module';
import { TranslationsModule } from './features/translations/translations.module';
import { UiBlocksModule } from './features/ui-blocks/ui-blocks.module';

@Module({
  imports: [CoreModule, DatabaseModule, UsersModule, LanguagesModule, ArticlesModule, TranslationsModule, UiBlocksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
