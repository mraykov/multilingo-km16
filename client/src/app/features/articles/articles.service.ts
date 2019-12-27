import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOMAIN } from '../../config/domain.config';
import { Observable } from 'rxjs';
import { ArticleDTO } from './models/article.dto';
import { ShowArticleDTO } from '../resume/models/show-article.dto';
import { CreateArticleDTO } from './models/create-article.dto';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  public getOriginalArticle(articleId: number): Observable<ArticleDTO> {
    return this.http.get<ArticleDTO>(`${DOMAIN.API_DOMAIN_NAME}/articles/${articleId}/original`);
  }

  public getArticle(articleId: number, language: string): Observable<ArticleDTO> {
    return this.http.get<ArticleDTO>(`${DOMAIN.API_DOMAIN_NAME}/articles/${articleId}?language=${language}`);
  }

  public createArticle(article: CreateArticleDTO): Observable<ArticleDTO> {
    return this.http.post<ArticleDTO>(`${DOMAIN.API_DOMAIN_NAME}/articles`, article);
  }

  public updateArticle(articleId: number, article: CreateArticleDTO): Observable<ArticleDTO> {
    return this.http.put<ArticleDTO>(`${DOMAIN.API_DOMAIN_NAME}/articles/${articleId}`, article);
  }

  public deleteArticle(articleId: number): Observable<ArticleDTO> {
    return this.http.delete<ArticleDTO>(`${DOMAIN.API_DOMAIN_NAME}/articles/${articleId}`);
  }

  public getArticleVersions(articleId, language): Observable<ShowArticleDTO[]> {
    return this.http.get<ShowArticleDTO[]>(`${DOMAIN.API_DOMAIN_NAME}/articles/${articleId}/versions?language=${language}`);
  }

  public makeCurrent(article: ShowArticleDTO, language: string): Observable<ShowArticleDTO[]> {
    return this.http.patch<ShowArticleDTO[]>(`${DOMAIN.API_DOMAIN_NAME}/articles/${article.id}/?language=${language}`, {});
  }

  public getAllArticles(language: string): Observable<ShowArticleDTO[]> {
    return this.http.get<ShowArticleDTO[]>(`${DOMAIN.API_DOMAIN_NAME}/articles?language=${language}`);
  }
}
