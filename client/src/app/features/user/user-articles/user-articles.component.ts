import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowArticleDTO } from '../../resume/models/show-article.dto';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { NotificatorService } from '../../../core/services/notificator.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticlesService } from '../../articles/articles.service';
import { modalSize } from '../models/size.enum';
import * as moment from 'moment';
import { AdminService } from '../../admin/admin.service';
import { UserAccountService } from '../user-account.service';

@Component({
  selector: 'app-user-articles',
  templateUrl: './user-articles.component.html',
  styleUrls: ['./user-articles.component.scss']
})
export class UserArticlesComponent implements OnInit, OnDestroy {
  public articles: ShowArticleDTO[];
  public filtered: ShowArticleDTO[];
  public versions: ShowArticleDTO[];

  private languageSubscription: Subscription;
  private userSubscription: Subscription;
  private uiBlocksSubscription: Subscription;
  public uiBlocks;
  public user;
  public language = navigator.language;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly articleService: ArticlesService,
    private readonly toastr: NotificatorService,
    private readonly modalService: NgbModal,
    private readonly adminService: AdminService,
    private readonly userAccountService: UserAccountService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(({ articles }) => {
      this.articles = articles;
      this.filtered = articles;
    });
    this.userSubscription = this.authService.loggedUser$.subscribe(user => {
      this.user = user;
    });
    this.languageSubscription = this.authService.languagePreference$.subscribe(lang => {
      this.language = lang;
    });
    this.uiBlocksSubscription = this.adminService.uiBlocks$.subscribe(
      blocks => {
        if (blocks) {
          this.uiBlocks = blocks;
        }
      }
    );
  }

  public searchArticle(value: string) {
    if (!value) {
      this.filtered = this.articles;
    } else {
      this.filtered = this.articles.filter(resume =>
        resume.title.text.toLowerCase().includes(value.toLowerCase())
      );
    }
  }

  navigateArticle(article: ShowArticleDTO) {
    this.router.navigate(['articles', article.id]);
    this.modalService.dismissAll();
  }

  public openModal(content, size, article?: ShowArticleDTO) {
    if (article) {
      this.articleService
        .getArticleVersions(article.id, this.language)
        .subscribe(res => {
          const articles = res.map(version => {
            version.datePublish = moment(version.datePublish).format('DD/MMM/YYYY');
            return version;
          });
          this.versions = [];
          this.versions = articles;
          this.versions.sort((a, b) => {
            return a.version - b.version;
          });
        });
    }
    this.modalService.open(content, { size, centered: true });
  }


  public makeCurrent(version: ShowArticleDTO) {
    this.articleService.makeCurrent(version, this.language)
      .subscribe(res => {
        const articleVersions = res.map(articleVersion => {
          articleVersion.datePublish = moment(articleVersion.datePublish).format('DD/MMM/YYYY');
          return articleVersion;
        });
        this.versions = [];
        this.versions = articleVersions;
        this.versions.sort((a, b) => {
          return a.version - b.version;
        });
      });
  }
  public delete(version: ShowArticleDTO) {
    this.articleService.deleteArticle(version.id).subscribe(
      res => {
        this.toastr.success('Article deleted successfully!');
      },
      error => {
        this.toastr.error(error.error.error);
      },
      () => {
        this.modalService.dismissAll();
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.uiBlocksSubscription.unsubscribe();
    this.languageSubscription.unsubscribe();
  }
}
