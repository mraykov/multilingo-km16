import { Injectable, OnDestroy } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { NotificatorService } from 'src/app/core/services/notificator.service';
import { map } from 'rxjs/operators';
import { ArticlesService } from '../articles.service';
import { ArticleDTO } from '../models/article.dto';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleInfoResolverService implements Resolve<ArticleDTO>, OnDestroy {
  public language: string;
  private languageSubscription: Subscription;

  constructor(
    private readonly router: Router,
    private readonly toastr: NotificatorService,
    private readonly articlesService: ArticlesService,
    private readonly authService: AuthService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
  ) {
    this.authService.languagePreference$.subscribe(lang => {
      this.language = lang;
    });

    const articleId: number = +route.paramMap.get(`id`);
    return this.articlesService.getArticle(articleId, this.language).pipe(
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
