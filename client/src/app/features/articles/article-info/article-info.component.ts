import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleDTO } from '../models/article.dto';
import { ArticlesService } from '../articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificatorService } from '../../../core/services/notificator.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { User } from '../../user/models/uset';
import { AuthService } from '../../../core/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleInputFieldComponent } from '../article-input-field/article-input-field.component';
import { ModalDeleteComponent } from '../../../shared/components/modal-delete/modal-delete.component';
import { AdminService } from '../../admin/admin.service';
import { CreateArticleDTO } from '../models/create-article.dto';

@Component({
  selector: 'app-article-info',
  templateUrl: './article-info.component.html',
  styleUrls: ['./article-info.component.scss']
})
export class ArticleInfoComponent implements OnInit, OnDestroy {
  public isArticleDeleted = false;
  public isOririginalArticle: boolean;
  public articleId: number;
  public article: ArticleDTO;
  public originalArticle: ArticleDTO;
  public translatedArticle: ArticleDTO;
  public isLoggedIn: boolean;
  public user: User;
  public language: string;

  private isLoggedUserSubscription: Subscription;
  private loggedUserSubscription: Subscription;
  private updateArticleModalSubscription: Subscription;
  private deleteArticleModalSubscription: Subscription;
  private languageSubscription: Subscription;

  private uiBlocksSubscription: Subscription;
  public uiBlocks;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly articlesService: ArticlesService,
    private readonly notification: NotificatorService,
    private readonly authService: AuthService,
    private readonly modalService: NgbModal,
    private readonly adminService: AdminService
  ) {}

  ngOnInit() {
    const articleId: number = +this.route.snapshot.params[`id`];
    this.articleId = articleId;
    this.route.data.subscribe(
      ({ article }) => {
        article.datePublish = moment(article.datePublish).format('YYYY-MM-DD');
        this.article = article;
        this.translatedArticle = article;
      },
      err => {
        this.notification.error('Something went wrong!');
      }
    );

    this.isLoggedUserSubscription = this.authService.isLoggedIn$.subscribe(
      data => (this.isLoggedIn = data)
    );
    this.loggedUserSubscription = this.authService.loggedUser$.subscribe(
      data => {
        this.user = data;
      }
    );
    this.languageSubscription = this.authService.languagePreference$.subscribe(
      data => {
        this.language = data;
        this.articlesService.getArticle(articleId, data).subscribe(article => {
          article.datePublish = moment(article.datePublish).format(
            'YYYY-MM-DD'
          );
          this.article = article;
          this.translatedArticle = article;
        });
      }
    );
    this.uiBlocksSubscription = this.adminService.uiBlocks$.subscribe(
      blocks => {
        if (blocks) {
          this.uiBlocks = blocks;
        }
      }
    );
  }

  public openArticleTextareaModal() {
    const modalRef = this.modalService.open(ArticleInputFieldComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.article = this.article;
    modalRef.componentInstance.uiBlocks = this.uiBlocks;

    this.updateArticleModalSubscription = modalRef.componentInstance.updatedArticleEm.subscribe(
      (data: { title: string; content: string }) => {
        const updatedArticle: CreateArticleDTO = {
          ...data,
          language: this.article.language.language
        };
        if (
          updatedArticle.title !== this.article.title.text ||
          updatedArticle.content !== this.article.content.text
        ) {
          this.updateArticle(updatedArticle);
        } else {
          this.notification.success('Nothing to update!');
        }
      },
      err => this.notification.error('Something went wrong with article modal!')
    );
    modalRef.result.finally(() =>
      this.updateArticleModalSubscription.unsubscribe()
    );
  }

  private updateArticle(updateArticle: CreateArticleDTO) {
    this.articlesService.updateArticle(this.articleId, updateArticle).subscribe(
      article => {
        this.articleId = article.id;
        article.datePublish = moment(article.datePublish).format('YYYY-MM-DD');
        this.article = article;
        this.originalArticle = article;
        this.articlesService
          .getArticle(this.articleId, this.language)
          .subscribe(translatedArticle => {
            translatedArticle.datePublish = moment(
              translatedArticle.datePublish
            ).format('YYYY-MM-DD');
            this.translatedArticle = translatedArticle;
          });
        this.notification.success(
          `Article with id: ${this.articleId} was update successfuly!`
        );
      },
      err => this.notification.error('Something went wrong!')
    );
  }

  public editOriginalArticle() {
    if (this.originalArticle) {
      this.article = this.originalArticle;
      this.isOririginalArticle = !this.isOririginalArticle;
    } else {
      this.articlesService.getOriginalArticle(this.articleId).subscribe(
        data => {
          data.datePublish = moment(data.datePublish).format('YYYY-MM-DD');
          this.article = data;
          this.originalArticle = data;
          this.isOririginalArticle = true;
        },
        err => {
          this.notification.error('Something went wrong!');
        }
      );
    }
  }

  public getArticleLanguage() {
    if (this.article.language) {
      if (this.article.language.language) {
        return this.article.language.language;
      }
      return this.article.language;
    }
    return '';
  }

  public returnBack() {
    this.article = this.translatedArticle;
    this.isOririginalArticle = !this.isOririginalArticle;
  }

  public deleteArticle() {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      size: 'lg',
      centered: true
    });
    this.deleteArticleModalSubscription = modalRef.componentInstance.deleteEvent.subscribe(
      data => {
        if (data) {
          this.articlesService.deleteArticle(this.articleId).subscribe(
            article => {
              this.notification.success(
                `Article with id: ${this.articleId} was deleted successfuly!`
              );
              this.router.navigate(['articles']);
            },
            err => this.notification.error('Something went wrong!')
          );
        }
      }
    );
  }

  public ngOnDestroy() {
    this.isLoggedUserSubscription.unsubscribe();
    this.loggedUserSubscription.unsubscribe();
    if (this.deleteArticleModalSubscription) {
      this.deleteArticleModalSubscription.unsubscribe();
    }
    this.uiBlocksSubscription.unsubscribe();
    this.languageSubscription.unsubscribe();
  }
}
