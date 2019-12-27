import { Injectable, OnDestroy } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { NotificatorService } from 'src/app/core/services/notificator.service';
import { map } from 'rxjs/operators';
import { TranslationsService } from '../translations.service';
import { TranslationDTO } from '../models/translation.dto';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationsTableResolverService implements Resolve<TranslationDTO[]>, OnDestroy {
  private languageSubscription: Subscription;
  public language;

  constructor(
    private readonly router: Router,
    private readonly toastr: NotificatorService,
    private readonly translationsService: TranslationsService,
    private readonly authService: AuthService
  ) {}

  resolve() {
    this.languageSubscription = this.authService.languagePreference$.subscribe(lang => {
      this.language = lang;
    });

    return this.translationsService.getAllTranslations(this.language).pipe(
      map(translations => {
        if (translations) {
          return translations;
        } else {
          this.router.navigate(['/home']);
          this.toastr.error('There was an unexpected error.');
          return;
        }
      })
    );
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }
}
