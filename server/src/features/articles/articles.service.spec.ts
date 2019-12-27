import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Article } from '../../database/entities/article.entity';
import { ArticleVersion } from '../../database/entities/article-version.entity';
import { Language } from '../../database/entities/languages.entity';
import { TranslationsService } from '../translations/translations.service';

describe('ArticlesService', () => {
  let service: ArticlesService;

  const articlesRepository = {
    find() { /*empty*/ },
    findOne() { /*empty*/ },
    create() { /*empty*/ },
    save() { /*empty*/ },
  };
  const articleVersionsRepository = {
    find() { /*empty*/ },
    findOne() { /*empty*/ },
    create() { /*empty*/ },
    save() { /*empty*/ },
  };
  const languagesRepository = {
    find() { /*empty*/ },
    findOne() { /*empty*/ },
    create() { /*empty*/ },
    save() { /*empty*/ },
  };
  const translationsService = {
    getArticlesTranslation() { /*empty*/ },
    translateToAllLanguages() { /*empty*/ },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getRepositoryToken(Article),
          useValue: articlesRepository,
        },
        {
          provide: getRepositoryToken(ArticleVersion),
          useValue: articleVersionsRepository,
        },
        {
          provide: getRepositoryToken(Language),
          useValue: languagesRepository,
        },
        {
          provide: TranslationsService,
          useValue: translationsService,
        },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
