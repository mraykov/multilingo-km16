import { Injectable, OnDestroy } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { NotificatorService } from 'src/app/core/services/notificator.service';
import { map } from 'rxjs/operators';
import { ArticlesService } from '../articles.service';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { ShowArticleDTO } from '../../resume/models/show-article.dto';

@Injectable({
  providedIn: 'root'
})
export class ArticleViewAllResolverService implements Resolve<ShowArticleDTO[]>, OnDestroy {
  public language: string;
  private languageSubscription: Subscription;

  constructor(
    private readonly router: Router,
    private readonly toastr: NotificatorService,
    private readonly articlesService: ArticlesService,
    private readonly authService: AuthService,
  ) { }

  resolve() {
    this.languageSubscription = this.authService.languagePreference$.subscribe(lang => {
      this.language = lang;
    });

    return this.articlesService.getAllArticles(this.language).pipe(
      map(article => {
        if (article) {
          return article;
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
