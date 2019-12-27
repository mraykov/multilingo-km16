import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShowArticleDTO } from './models/show-article.dto';
import { DOMAIN } from '../../config/domain.config';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor(private readonly http: HttpClient) { }

  public getMostRecentArticles(language: string): Observable<ShowArticleDTO> {
    return this.http.get<ShowArticleDTO>(`${DOMAIN.API_DOMAIN_NAME}/articles/recent?language=${language}`);
  }
}
