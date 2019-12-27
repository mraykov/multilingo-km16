import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
  Param,
  Query,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDTO } from '../../models/articles/create-article.dto';
import { User } from '../../database/entities/user.entity';
import { UserReq } from '../../common/decorators/user.decorator';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ArticleVersion } from '../../database/entities/article-version.entity';
import { AdminGuard } from '../../common/guards/admin.guard';
import { TransformInterceptor } from '../../common/transformer/interceptors/transform.interceptor';
import { ShowArticleDTO } from '../../models/articles/show-article.dto';
import { ShowArticleVersionDTO } from '../../models/articles/show-article-version.dto';
import { ShowTranslatedArticleDTO } from '../../models/articles/show-translated-article.dto';

@Controller('articles')
@ApiUseTags('Articles CRUD')
export class ArticlesController {
  public constructor(private readonly articlesService: ArticlesService) {}

  @Get('deleted')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @UseInterceptors(new TransformInterceptor(ShowArticleDTO))
  public async retrieveDeletedArticles(): Promise<ArticleVersion[]> {
    return await this.articlesService.retrieveDeletedArticles();
  }

  @Get()
  @UseInterceptors(new TransformInterceptor(ShowTranslatedArticleDTO))
  public async getAllArticles(
    @Query('language') language: string,
  ): Promise<ShowTranslatedArticleDTO[]> {
    return await this.articlesService.getAllArticles(language);
  }

  @Get('recent')
  @ApiBearerAuth()
  @UseInterceptors(new TransformInterceptor(ShowTranslatedArticleDTO))
  public async getMostRecentArticles(
    @Query('language') language: string,
  ): Promise<ShowTranslatedArticleDTO[]> {
    return await this.articlesService.getMostRecentArticles(language);
  }

  @Get(':articleId')
  @ApiBearerAuth()
  @UseInterceptors(new TransformInterceptor(ShowTranslatedArticleDTO))
  public async getArticleById(
    @Param('articleId', new ParseIntPipe()) articleId: number,
    @Query('language') language: string,
  ): Promise<ShowTranslatedArticleDTO> {
    return await this.articlesService.getArticleById(articleId, language);
  }

  @Get(':articleVersionId/original')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(ShowTranslatedArticleDTO))
  public async getOriginalArticleById(
    @Param('articleVersionId', new ParseIntPipe()) articleVersionId: number,
    @UserReq() user: User,
  ): Promise<ShowTranslatedArticleDTO> {
    return await this.articlesService.getOriginalArticleById(articleVersionId, user);
  }

  @Get(':articleId/versions')
  @ApiBearerAuth()
  @UseInterceptors(new TransformInterceptor(ShowTranslatedArticleDTO))
  public async getArticleVersions(
    @Param('articleId', new ParseIntPipe()) articleId: number,
    @Query('language') language: string,
  ): Promise<ShowTranslatedArticleDTO[]> {
    return await this.articlesService.getArticleVersions(articleId, language);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(ShowArticleVersionDTO))
  public async createArticle(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    createArticle: CreateArticleDTO,
    @UserReq() user: User,
  ) {
    return await this.articlesService.createArticle(createArticle, user);
  }

  @Put(':articleVersionId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(ShowTranslatedArticleDTO))
  public async updateArticle(
    @Param('articleVersionId', new ParseIntPipe()) articleVersionId: number,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    article: CreateArticleDTO,
    @UserReq() user: User,
  ): Promise<ShowTranslatedArticleDTO> {
    return await this.articlesService.updateArticle(articleVersionId, article, user);
  }

  @Patch(':articleVersionId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(ShowArticleVersionDTO))
  public async makeCurrentArticle(
    @Param('articleVersionId', new ParseIntPipe()) articleVersionId: number,
    @Query('language') language: string,
    @UserReq() user: User,
  ) {
    return await this.articlesService.makeCurrentArticle(articleVersionId, language, user);
  }

  @Delete(':articleId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  public async deleteArticle(
    @Param('articleId', new ParseIntPipe()) articleId: number,
    @UserReq() user: User,
  ): Promise<{msg: string}> {
    return await this.articlesService.deleteArticle(articleId, user);
  }
}
