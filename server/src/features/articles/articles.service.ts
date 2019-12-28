import { Injectable } from '@nestjs/common';
import { CreateArticleDTO } from '../../models/articles/create-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../../database/entities/article.entity';
import { ArticleVersion } from '../../database/entities/article-version.entity';
import { User } from '../../database/entities/user.entity';
import { Language } from '../../database/entities/languages.entity';
import { LingosSystemError } from '../../common/exceptions/lingo-system.error';
import { CreateArticleVersionDTO } from '../../models/articles/create-article-version.dto';
import { TranslationsService } from '../translations/translations.service';
import { TranslateToAllLanguagesDTO } from '../../models/translations/translate-to-all.dto';
import { TranslationTypeEnum } from '../../common/enums/translation-type.enum';
import { ShowTranslatedArticleDTO } from '../../models/articles/show-translated-article.dto';

@Injectable()
export class ArticlesService {
  public constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>,
    @InjectRepository(ArticleVersion)
    private readonly articleVersionsRepository: Repository<ArticleVersion>,
    @InjectRepository(Language)
    private readonly languagesRepository: Repository<Language>,
    private readonly translationsService: TranslationsService,
  ) {}

  public async getAllArticles(
    language: string,
  ): Promise<ShowTranslatedArticleDTO[]> {
    const articles = await this.articleVersionsRepository.find({
      where: { isCurrent: true, isDeleted: false, isPublsihed: true },
      relations: ['author', 'language'],
      order: { datePublish: 'DESC' },
    });
    const translatedArticles = await this.translationsService.getArticlesTranslation(
      articles,
      language,
    );
    return translatedArticles;
  }

  public async getMostRecentArticles(
    language: string,
  ): Promise<ShowTranslatedArticleDTO[]> {
    const articles = await this.articleVersionsRepository.find({
      where: { isCurrent: true, isDeleted: false, isPublsihed: true },
      relations: ['author'],
      order: { datePublish: 'DESC' },
      take: 6,
    });
    articles.splice(10);
    const translatedArticles = await this.translationsService.getArticlesTranslation(
      articles,
      language,
    );
    return translatedArticles;
  }

  public async getOriginalArticleById(
    articleVersionId: number,
    user: User,
  ): Promise<ShowTranslatedArticleDTO> {
    const articleVersion = await this.articleVersionsRepository.findOne({
      where: { id: articleVersionId },
      relations: ['author', 'language'],
    });

    if (!articleVersion || articleVersion.isDeleted) {
      throw new LingosSystemError('Not such article found!', 404);
    }

    if ((await articleVersion.author).username !== user.username) {
      throw new LingosSystemError('You are not autorized!', 400);
    }

    const translations = await this.translationsService.getArticlesTranslation(
      [articleVersion],
      (await articleVersion.language).language,
    );
    return translations[0];
  }

  public async getArticleById(
    articleId: number,
    language: string,
  ): Promise<ShowTranslatedArticleDTO> {
    const article = await this.articleVersionsRepository.findOne({
      where: { id: articleId },
      relations: ['author', 'language'],
    });

    if (!article || article.isDeleted || !article.isPublsihed) {
      throw new LingosSystemError('Not such article found!', 404);
    }
    const translations = await this.translationsService.getArticlesTranslation(
      [article],
      language,
    );
    return translations[0];
  }

  public async getUsersArticles(
    userId: number,
    language: string,
  ): Promise<ShowTranslatedArticleDTO[]> {
    const articles = await this.articleVersionsRepository.find({
      where: { author: userId, isDeleted: false, isCurrent: true },
      order: { datePublish: 'DESC' },
      relations: ['author'],
    });
    const translated = await this.translationsService.getArticlesTranslation(
      articles,
      language,
    );
    return translated;
  }

  public async retrieveDeletedArticles(): Promise<ArticleVersion[]> {
    return await this.articleVersionsRepository.find({
      where: { isDeleted: true },
      relations: ['article'],
    });
  }

  public async getArticleVersions(
    id: number,
    language: string,
  ): Promise<ShowTranslatedArticleDTO[]> {
    const found: any = await this.articleVersionsRepository.findOne({
      where: { id },
      relations: ['article'],
    });

    const mainArticleId = found.__article__.id;

    const articles = await this.articleVersionsRepository.find({
      where: { article: mainArticleId, isDeleted: false },
      relations: ['author', 'article'],
    });
    const translated = await this.translationsService.getArticlesTranslation(
      articles,
      language,
    );
    return translated;
  }

  public async createArticle(
    article: CreateArticleDTO,
    user: User,
  ): Promise<ShowTranslatedArticleDTO> {
    // Translation title
    const titleTranslantion: TranslateToAllLanguagesDTO = {
      text: article.title,
      originLanguage: article.language,
      type: TranslationTypeEnum.TITLE,
    };
    await this.translationsService.translateToAllLanguages(titleTranslantion);
    // Translation content
    const contentTranslantion: TranslateToAllLanguagesDTO = {
      text: article.content,
      originLanguage: article.language,
      type: TranslationTypeEnum.CONTENT,
    };
    await this.translationsService.translateToAllLanguages(contentTranslantion);

    const language = await this.languagesRepository.findOne({
      where: { language: article.language },
    });

    if (!language) {
      throw new LingosSystemError('Not such language found!', 404);
    }
    const newArticle = await this.createArticleAndSave(user);

    const createArticleVersionDTO: CreateArticleVersionDTO = {
      ...article,
      language: Promise.resolve(language),
      author: Promise.resolve(user),
      article: Promise.resolve(newArticle),
    };
    const articleVersion = await this.createArticleVersion(
      createArticleVersionDTO,
    );

    const translations = await this.translationsService.getArticlesTranslation(
      [articleVersion],
      language.language,
    );
    return translations[0];
  }

  public async makeCurrentArticle(
    articleVersionId: number,
    language: string,
    user: User,
  ) {
    const foundArticleVersion: any = await this.articleVersionsRepository.findOne(
      {
        where: { id: articleVersionId },
        relations: ['author', 'article'],
      },
    );

    if (foundArticleVersion.__author__.id !== user.id) {
      throw new LingosSystemError(
        'You are not authorized to perform this action',
        400,
      );
    }

    const mainArticleId = foundArticleVersion.__article__.id;

    const articleVersions = await this.articleVersionsRepository.find({
      where: { article: await { id: mainArticleId }, isDeleted: false },
    });

    await Promise.all(
      articleVersions.map(async articleVersion => {
        if (articleVersion.id === +articleVersionId) {
          articleVersion.isCurrent = true;
        } else {
          articleVersion.isCurrent = false;
        }
        return await this.articleVersionsRepository.save(articleVersion);
      }),
    );

    const changedArticlesVersions = await this.articleVersionsRepository.find({
      where: { article: mainArticleId, isDeleted: false },
      relations: ['author', 'article', 'language'],
    });

    const translated = await this.translationsService.getArticlesTranslation(
      changedArticlesVersions,
      language,
    );

    return translated;
  }

  public async updateArticle(
    articleVersionId: number,
    article: CreateArticleDTO,
    user: User,
  ): Promise<ShowTranslatedArticleDTO> {
    // Translation title
    const titleTranslantion: TranslateToAllLanguagesDTO = {
      text: article.title,
      originLanguage: article.language,
      type: TranslationTypeEnum.TITLE,
    };
    await this.translationsService.translateToAllLanguages(titleTranslantion);
    // Translation content
    const contentTranslantion: TranslateToAllLanguagesDTO = {
      text: article.content,
      originLanguage: article.language,
      type: TranslationTypeEnum.CONTENT,
    };
    await this.translationsService.translateToAllLanguages(contentTranslantion);

    const language = await this.languagesRepository.findOne({
      where: { language: article.language },
    });
    const getArticleVersion = await this.articleVersionsRepository.findOne({
      where: { id: articleVersionId },
      relations: ['article'],
    });
    const createArticleVersionDTO: CreateArticleVersionDTO = {
      ...article,
      language: Promise.resolve(language),
      author: Promise.resolve(user),
      article: getArticleVersion.article,
    };

    const createdArticleVersion: ArticleVersion = await this.createArticleVersion(
      createArticleVersionDTO,
    );
    const translations = await this.translationsService.getArticlesTranslation(
      [createdArticleVersion],
      language.language,
    );

    getArticleVersion.isCurrent = false;
    await this.articleVersionsRepository.save(getArticleVersion);
    return translations[0];
  }

  public async deleteArticle(articleId: number, user: User): Promise<{msg: string}> {
    const found = await this.articleVersionsRepository.findOne({
      where: { id: articleId, isDeleted: false },
    });

    if (!found) {
      throw new LingosSystemError('Such article does not exists', 400);
    }
    if (found.isCurrent) {
      found.isDeleted = true;
      found.isCurrent = false;
      const mainArticle = await Promise.resolve(found.article);
      const articles = await this.articleVersionsRepository.find({
        where: { article: mainArticle.id, isDeleted: false, isCurrent: false },
        order: { version: 'DESC' },
      });
      const current = articles[0];
      current.isCurrent = true;
      await this.articleVersionsRepository.save(found);
      await this.articleVersionsRepository.save(current);
      return { msg: 'The version was deleted successfully!' };
    } else {
      found.isDeleted = true;
      await this.articleVersionsRepository.save(found);
      return { msg: 'The version was deleted successfully!' };
    }
  }

  private async createArticleVersion(
    createArticleVersionDTO: CreateArticleVersionDTO,
  ): Promise<ArticleVersion> {
    const id = (await createArticleVersionDTO.article).id;
    const [lastVersionOfArticle] = await this.articleVersionsRepository.find({
      where: { article: id },
      order: { version: 'DESC' },
      take: 1,
    });

    const articleVersion = this.articleVersionsRepository.create(
      createArticleVersionDTO,
    );

    if (lastVersionOfArticle) {
      articleVersion.version = lastVersionOfArticle.version + 1;
      lastVersionOfArticle.isCurrent = false;
      await this.articleVersionsRepository.save(lastVersionOfArticle);
    } else {
      articleVersion.version = 1;
    }
    articleVersion.author = createArticleVersionDTO.author;
    articleVersion.article = createArticleVersionDTO.article;
    articleVersion.language = createArticleVersionDTO.language;

    const createdArticleVersion = await this.articleVersionsRepository.save(
      articleVersion,
    );

    return await this.articleVersionsRepository.findOne({
      where: { id: createdArticleVersion.id },
      relations: ['author', 'language', 'article', 'article.author'],
    });
  }

  private async createArticleAndSave(user: User): Promise<Article> {
    const articleCreated = this.articlesRepository.create();
    articleCreated.author = Promise.resolve(user);

    return await this.articlesRepository.save(articleCreated);
  }
}
