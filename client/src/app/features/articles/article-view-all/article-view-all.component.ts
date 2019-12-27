import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowArticleDTO } from '../../resume/models/show-article.dto';
import { AdminService } from '../../admin/admin.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-article-view-all',
  templateUrl: './article-view-all.component.html',
  styleUrls: ['./article-view-all.component.scss']
})
export class ArticleViewAllComponent implements OnInit, OnDestroy {
  public resumes: ShowArticleDTO[];
  public filtered: ShowArticleDTO[];

  private languageSubscription: Subscription;
  private uiBlocksSubscription: Subscription;
  public uiBlocks;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
    private readonly articleService: ArticlesService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(({ resumes }) => {
      this.resumes = resumes;
      this.filtered = resumes;
    });
    this.languageSubscription = this.authService.languagePreference$.subscribe(lang => {
      this.articleService.getAllArticles(lang).subscribe(articles => {
        this.resumes = articles;
        this.filtered = articles;
      });
    });
    this.uiBlocksSubscription = this.adminService.uiBlocks$.subscribe(blocks => {
      if (blocks) {
        this.uiBlocks = blocks;
      }
    });
  }

  public filterArticles(value: string) {
    if (!value) {
      this.filtered = this.resumes;
    } else {
      this.filtered = this.resumes.filter(resume =>
        resume.content.text.toLowerCase().includes(value.toLowerCase())
      );
    }
  }

  public ngOnDestroy() {
    this.uiBlocksSubscription.unsubscribe();
    this.languageSubscription.unsubscribe();
  }

}
