import { Injectable, OnDestroy } from '@angular/core';
import { ShowArticleDTO } from '../../resume/models/show-article.dto';
import { Router, Resolve } from '@angular/router';
import { NotificatorService } from '../../../core/services/notificator.service';
import { UserAccountService } from '../user-account.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserArticlesResolverService implements Resolve<ShowArticleDTO[]>, OnDestroy {
  private userSubscription: Subscription;
  private languageSubscription: Subscription;

  public user;
  public language: string;
  constructor(
    private readonly router: Router,
    private readonly toastr: NotificatorService,
    private readonly userAccountService: UserAccountService,
    private readonly authService: AuthService
  ) {}

  resolve() {
    this.userSubscription = this.authService.loggedUser$.subscribe(user => {
      this.user = user;
    });
    this.languageSubscription = this.authService.languagePreference$.subscribe(lang => {
      this.language = lang;
    });

    return this.userAccountService.getUserArticles(this.user.id, this.language).pipe(
      map(articles => {
        if (articles) {
          return articles;
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
    this.userSubscription.unsubscribe();
  }
}
