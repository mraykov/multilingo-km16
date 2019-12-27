import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddUIBlockDTO } from './ui-blocks/models/add-ui-block.dto';
import { DOMAIN } from '../../config/domain.config';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { ShowUIBlockDTO } from './ui-blocks/models/show-ui-block.dto';
import { ShowUserDTO } from '../user/models/show-user.dto';
import { ShowLanguagesDTO } from './languages/models/show-languages.dto';
import { AddLanguageDTO } from './languages/models/add-language.dto';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements OnDestroy {
  private readonly uiBlocksSubject$ = new BehaviorSubject<object>({});
  private languageSubscription: Subscription;
  public language;
  public get uiBlocks$(): Observable<object> {
    return this.uiBlocksSubject$.asObservable();
  }
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {
    this.languageSubscription = this.authService.languagePreference$.subscribe(
      language => {
        this.language = language;
        this.getUIBlocks(this.language).subscribe(res => this.pushBlocks(res));
      },
    );
  }

  public addUIBlock(uiBlock: AddUIBlockDTO): Observable<AddUIBlockDTO> {
    return this.http.post<AddUIBlockDTO>(
      `${DOMAIN.API_DOMAIN_NAME}/ui-blocks`,
      uiBlock
    );
  }

  public getUIBlocks(language: string) {
    return this.http.get<ShowUIBlockDTO[]>(
      `${DOMAIN.API_DOMAIN_NAME}/ui-blocks?language=${language}`
    );
  }

  public pushBlocks(blocks: ShowUIBlockDTO[]) {
    const sendBlocks = blocks.reduce((acc, value) => {
      acc[value.key] = value.content;
      return acc;
    }, {});
    this.uiBlocksSubject$.next(sendBlocks);
  }

  public editBlock(block: ShowUIBlockDTO): Observable<ShowUIBlockDTO> {
    return this.http.patch<ShowUIBlockDTO>(
      `${DOMAIN.API_DOMAIN_NAME}/ui-blocks`,
      block
    );
  }

  public getAllUsers(): Observable<ShowUserDTO[]> {
    return this.http.get<ShowUserDTO[]>(`${DOMAIN.API_DOMAIN_NAME}/users`);
  }

  public deleteUser(id: number): Observable<ShowUserDTO> {
    return this.http.delete<ShowUserDTO>(
      `${DOMAIN.API_DOMAIN_NAME}/users/${id}`
    );
  }

  public updateUser(user: ShowUserDTO): Observable<ShowUserDTO> {
    return this.http.put<ShowUserDTO>(
      `${DOMAIN.API_DOMAIN_NAME}/users/${user.id}`,
      user
    );
  }

  public getSupportedLanguages(): Observable<ShowLanguagesDTO[]> {
    return this.http.get<ShowLanguagesDTO[]>(
      `${DOMAIN.API_DOMAIN_NAME}/languages?allSupportedLang=${true}`
    );
  }

  public getActiveLanguages(): Observable<ShowLanguagesDTO[]> {
    return this.http.get<ShowLanguagesDTO[]>(
      `${DOMAIN.API_DOMAIN_NAME}/languages?active=${true}`
    );
  }

  public getGoogleLanguages(): Observable<object> {
    return this.http.get<object>(
      `${DOMAIN.API_DOMAIN_NAME}/languages?all=${true}`
    );
  }

  public changeStatus(
    language: ShowLanguagesDTO
  ): Observable<ShowLanguagesDTO> {
    return this.http.patch<ShowLanguagesDTO>(
      `${DOMAIN.API_DOMAIN_NAME}/languages/${language.id}`,
      language
    );
  }

  public deleteLanguage(
    language: ShowLanguagesDTO
  ): Observable<ShowLanguagesDTO> {
    return this.http.delete<ShowLanguagesDTO>(
      `${DOMAIN.API_DOMAIN_NAME}/languages/${language.id}`
    );
  }

  public addLanguage(language: AddLanguageDTO): Observable<ShowLanguagesDTO> {
    return this.http.post<ShowLanguagesDTO>(
      `${DOMAIN.API_DOMAIN_NAME}/languages`,
      language
    );
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }
}
