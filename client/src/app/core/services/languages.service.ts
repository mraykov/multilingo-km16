import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LanguageDTO } from '../../features/translations/models/languages/language.dto';
import { DOMAIN } from '../../config/domain.config';
import { Observable } from 'rxjs';
import { DetectionTextDTO } from '../../features/articles/models/languages/detection-text-dto';
import { DetectedLanguageDTO } from '../../features/articles/models/languages/detected-language.dto';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(
    private readonly http: HttpClient
    ) { }

  public getAllSupportedLanguages(): Observable<LanguageDTO[]> {
    return this.http.get<LanguageDTO[]>(`${DOMAIN.API_DOMAIN_NAME}/languages?active=${true}`);
  }

  public detectLanguage(detectionText: DetectionTextDTO): Observable<DetectedLanguageDTO> {
    return this.http.post<DetectedLanguageDTO>(`${DOMAIN.API_DOMAIN_NAME}/languages/detect`, detectionText);
  }
}
