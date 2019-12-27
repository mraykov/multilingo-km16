import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

describe('Articles Controller', () => {
  let controller: ArticlesController;

  const articlesService = {
    retrieveDeletedArticles() { /* empty */ },
    getAllArticles() { /* empty */ },
    getMostRecentArticles() { /* empty */ },
    getArticleById() { /* empty */ },
    getOriginalArticleById() { /* empty */ },
    getArticleVersions() { /* empty */ },
    createArticle() { /* empty */ },
    updateArticle() { /* empty */ },
    makeCurrentArticle() { /* empty */ },
    deleteArticle() { /* empty */ },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        {
          provide: ArticlesService,
          useValue: articlesService,
        },

      ],
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
