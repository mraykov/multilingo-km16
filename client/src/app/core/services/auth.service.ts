import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { NotificatorService } from './notificator.service';
import { DOMAIN } from '../../config/domain.config';
import { User } from '../../features/user/models/uset';
import { UserLoginDTO } from '../../features/user/models/user-login.dto';
import { UserRegisterDTO } from '../../features/user/models/user-register.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly helper = new JwtHelperService();

  private readonly isLoggedInSubject$ = new BehaviorSubject<boolean>(
    this.isUserLoggedIn()
  );
  private readonly loggedUserSubject$ = new BehaviorSubject<User>(
    this.loggedUser()
  );

  private readonly languagePreferenceSubject$ = new BehaviorSubject<string>(
    this.userLanguage()
  );

  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService,
    private readonly router: Router,
    private readonly toastr: NotificatorService
  ) {}

  public get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject$.asObservable();
  }

  public get loggedUser$(): Observable<User> {
    return this.loggedUserSubject$.asObservable();
  }

  public get languagePreference$(): Observable<string> {
    return this.languagePreferenceSubject$.asObservable();
  }

  public set languagePreferenceSet(language: string) {
    this.languagePreferenceSubject$.next(language);
  }


  public login(user: UserLoginDTO): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${DOMAIN.API_DOMAIN_NAME}/session`, user)
      .pipe(
        tap(({ token }) => {
          try {
            const loggedUser = this.helper.decodeToken(token);
            this.storage.save('token', token);
            this.isLoggedInSubject$.next(true);
            this.loggedUserSubject$.next(loggedUser);
            const language = this.userLanguage();
            this.languagePreferenceSet = language;
          } catch (error) {
            // error handling on the consumer side
          }
        })
      );
  }
  public register(user: UserRegisterDTO): Observable<User> {
    return this.http.post<User>(`${DOMAIN.API_DOMAIN_NAME}/users`, user);
  }

  private isUserLoggedIn(): boolean {
    return !!this.storage.read('token');
  }

  private loggedUser(): User {
    try {
      return this.helper.decodeToken(this.storage.read('token'));
    } catch (error) {
      // in case of storage tampering
      this.isLoggedInSubject$.next(false);

      return null;
    }
  }

  private userLanguage() {
    const user = this.loggedUser();
    if (user && user.preferredLanguage) {
      return user.preferredLanguage;
    } else {
      return navigator.language;
    }
  }

  public logout() {
    this.storage.clear();
    this.isLoggedInSubject$.next(false);
    this.loggedUserSubject$.next(null);
    this.languagePreferenceSubject$.next(navigator.language);
    this.toastr.success('Successfully logged out!');
    this.router.navigate(['home']);
  }
}
