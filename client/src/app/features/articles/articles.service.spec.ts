import { TestBed } from '@angular/core/testing';

import { ArticlesService } from './articles.service';
import { HttpClient } from '@angular/common/http';
import { DOMAIN } from '../../config/domain.config';
import { CreateArticleDTO } from './models/create-article.dto';
import { ShowArticleDTO } from '../resume/models/show-article.dto';

describe('ArticleTranslationService', () => {

  const http = {
    get() { },
    post() { },
    put() { },
    patch() { },
    delete() { },
  };

  let getService: () => ArticlesService;

  beforeEach(() => {
    // clear all spies and mocks
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [ArticlesService, HttpClient]
    })
      .overrideProvider(HttpClient, { useValue: http });

    getService = () => TestBed.get(ArticlesService);
  });

  it('should be created', () => {
    const service: ArticlesService = getService();
    expect(service).toBeTruthy();
  });

  describe('getOriginalArticle', () => {
    it('should call http.get once with correct arguments', () => {
      // Arrange
      const mockArticleId = 1;
      const mockArgument = `${DOMAIN.API_DOMAIN_NAME}/articles/${mockArticleId}/original`;
      const spy = jest.spyOn(http, 'get');

      // Act
      const service: ArticlesService = getService();
      service.getOriginalArticle(mockArticleId);

      // Assert
      expect(spy).toBeCalledWith(mockArgument);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('getArticle', () => {
    it('should call http.get once with correct arguments', () => {
      // Arrange
      const mockArticleId = 1;
      const mockLanguage = 'en';
      const mockArgument = `${DOMAIN.API_DOMAIN_NAME}/articles/${mockArticleId}?language=${mockLanguage}`;
      const spy = jest.spyOn(http, 'get');

      // Act
      const service: ArticlesService = getService();
      service.getArticle(mockArticleId, mockLanguage);

      // Assert
      expect(spy).toBeCalledWith(mockArgument);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('createArticle', () => {
    it('should call http.post once with correct arguments', () => {
      // Arrange
      const mockArticle = new CreateArticleDTO();
      const mockArgument = `${DOMAIN.API_DOMAIN_NAME}/articles`;
      const spy = jest.spyOn(http, 'post');

      // Act
      const service: ArticlesService = getService();
      service.createArticle(mockArticle);

      // Assert
      expect(spy).toBeCalledWith(mockArgument, mockArticle);
      expect(spy).toBeCalledTimes(1);
    });
  });


  describe('updateArticle', () => {
    it('should call http.put once with correct arguments', () => {
      // Arrange
      const mockArticleId = 1;
      const mockArticle = new CreateArticleDTO();
      const mockArgument = `${DOMAIN.API_DOMAIN_NAME}/articles/${mockArticleId}`;
      const spy = jest.spyOn(http, 'put');

      // Act
      const service: ArticlesService = getService();
      service.updateArticle(mockArticleId, mockArticle);

      // Assert
      expect(spy).toBeCalledWith(mockArgument, mockArticle);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('deleteArticle', () => {
    it('should call http.delete once with correct arguments', () => {
      // Arrange
      const mockArticleId = 1;
      const mockArgument = `${DOMAIN.API_DOMAIN_NAME}/articles/${mockArticleId}`;
      const spy = jest.spyOn(http, 'delete');

      // Act
      const service: ArticlesService = getService();
      service.deleteArticle(mockArticleId);

      // Assert
      expect(spy).toBeCalledWith(mockArgument);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('getArticleVersions', () => {
    it('should call http.get once with correct arguments', () => {
      // Arrange
      const mockArticleId = 1;
      const mockLanguage = 'en';
      const mockArgument = `${DOMAIN.API_DOMAIN_NAME}/articles/${mockArticleId}/versions?language=${mockLanguage}`;
      const spy = jest.spyOn(http, 'get');

      // Act
      const service: ArticlesService = getService();
      service.getArticleVersions(mockArticleId, mockLanguage);

      // Assert
      expect(spy).toBeCalledWith(mockArgument);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('makeCurrent', () => {
    it('should call http.patch once with correct arguments', () => {
      // Arrange
      const mockArticle = new ShowArticleDTO();
      mockArticle.id = 5;
      const mockLanguage = 'en';
      const mockArgument = `${DOMAIN.API_DOMAIN_NAME}/articles/${mockArticle.id}/?language=${mockLanguage}`;
      const spy = jest.spyOn(http, 'patch');

      // Act
      const service: ArticlesService = getService();
      service.makeCurrent(mockArticle, mockLanguage);

      // Assert
      expect(spy).toBeCalledWith(mockArgument, {});
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('getAllArticles', () => {
    it('should call http.get once with correct arguments', () => {
      // Arrange
      const mockLanguage = 'bg';
      const mockArgument = `${DOMAIN.API_DOMAIN_NAME}/articles?language=${mockLanguage}`;
      const spy = jest.spyOn(http, 'get');

      // Act
      const service: ArticlesService = getService();
      service.getAllArticles(mockLanguage);

      // Assert
      expect(spy).toBeCalledWith(mockArgument);
      expect(spy).toBeCalledTimes(1);
    });
  });

});
