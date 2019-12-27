import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowArticleDTO } from '../models/show-article.dto';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin/admin.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})
export class RecentComponent implements OnInit, OnDestroy {
  public resumes: ShowArticleDTO[];
  public filtered: ShowArticleDTO[];
  public uiBlocksSubscription: Subscription;
  public uiBlocks;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly adminService: AdminService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ resumes }) => {
      this.resumes = resumes;
      this.filtered = resumes;
    });
    this.uiBlocksSubscription = this.adminService.uiBlocks$.subscribe(
      blocks => {
        if (blocks) {
          this.uiBlocks = blocks;
        }
      }
    );
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

  ngOnDestroy() {
    this.uiBlocksSubscription.unsubscribe();
  }
}
