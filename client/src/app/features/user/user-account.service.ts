import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOMAIN } from '../../config/domain.config';
import { ShowArticleDTO } from '../resume/models/show-article.dto';
import { ShowUserDTO } from './models/show-user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  constructor(private readonly http: HttpClient) {}

  public getUserArticles(
    id: number,
    language: string
  ): Observable<ShowArticleDTO[]> {
    return this.http.get<ShowArticleDTO[]>(
      `${DOMAIN.API_DOMAIN_NAME}/users/${id}/articles?language=${language}`
    );
  }

  public getUserDetails(id: number): Observable<ShowUserDTO> {
    return this.http.get<ShowUserDTO>(`${DOMAIN.API_DOMAIN_NAME}/users/${id}`);
  }

  public changePassword(userId: number, password): Observable<ShowUserDTO> {
    return this.http.patch<ShowUserDTO>(
      `${DOMAIN.API_DOMAIN_NAME}/users/${userId}/password`,
      password
    );
  }

  public changeLanguage(user, language): Observable<object> {
    return this.http.patch<object>(`${DOMAIN.API_DOMAIN_NAME}/users/${user.id}/language`, language);
  }

}
