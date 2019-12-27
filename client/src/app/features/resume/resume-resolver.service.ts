import { Injectable, OnDestroy } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { ResumeService } from './resume.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { ShowArticleDTO } from './models/show-article.dto';
import { Subscription } from 'rxjs';
import { NotificatorService } from '../../core/services/notificator.service';

@Injectable({
  providedIn: 'root'
})
export class ResumeResolverService implements Resolve<ShowArticleDTO>, OnDestroy {
  public language;
  private languageSubscription: Subscription;

  constructor(
    private readonly router: Router,
    private readonly toastr: NotificatorService,
    private readonly resumeService: ResumeService,
    private readonly authService: AuthService

  ) {}

  resolve() {
    this.languageSubscription = this.authService.languagePreference$.subscribe(lang => {
      this.language = lang;
    });
    return this.resumeService.getMostRecentArticles(this.language).pipe(
      map(resumes => {
        if (resumes) {
          return resumes;
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
