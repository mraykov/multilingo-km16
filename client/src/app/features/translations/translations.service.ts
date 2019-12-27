import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DOMAIN } from '../../config/domain.config';
import { TranslationDTO } from './models/translation.dto';
import { UpdateTranslationDTO } from './models/update-translation.dto';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getTranslationById(translationId: number): Observable<TranslationDTO> {
    return this.http.get<TranslationDTO>(`${DOMAIN.API_DOMAIN_NAME}/translations/${translationId}`);
  }

  public getAllTranslations(language: string): Observable<TranslationDTO[]> {
    return this.http.get<TranslationDTO[]>(`${DOMAIN.API_DOMAIN_NAME}/translations?language=${language}`);
  }

  public editTranslationById(translationId: number, body: UpdateTranslationDTO): Observable<TranslationDTO> {
    return this.http.patch<TranslationDTO>(`${DOMAIN.API_DOMAIN_NAME}/translations/${translationId}`, body);
  }
}
