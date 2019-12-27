import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { UsersController } from './users.controller';
import { Role } from '../../database/entities/role.entity';
import { ArticlesModule } from '../articles/articles.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../../config/config.service';
import { ArticleVersion } from '../../database/entities/article-version.entity';
import { Article } from '../../database/entities/article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Article, ArticleVersion]),
    ArticlesModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.jwtSecret,
        signOptions: {
          expiresIn: configService.jwtExpireTime,
        },
      }),
    }),
],
  providers: [ UsersService ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
