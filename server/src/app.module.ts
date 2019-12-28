import { Module } from '@nestjs/common';
import { UsersModule } from './features/users/users.module';
import { DatabaseModule } from './database/database.module';
import { LanguagesModule } from './features/languages/languages.module';
import { ArticlesModule } from './features/articles/articles.module';
import { TranslationsModule } from './features/translations/translations.module';
import { UiBlocksModule } from './features/ui-blocks/ui-blocks.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({isGlobal: true}),
    DatabaseModule,
    UsersModule,
    LanguagesModule,
    ArticlesModule,
    TranslationsModule,
    UiBlocksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
