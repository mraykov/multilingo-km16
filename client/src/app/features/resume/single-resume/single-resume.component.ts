import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ShowArticleDTO } from '../models/show-article.dto';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin/admin.service';

@Component({
  selector: 'app-single-resume',
  templateUrl: './single-resume.component.html',
  styleUrls: ['./single-resume.component.scss']
})
export class SingleResumeComponent implements OnInit, OnDestroy {
  @Input() public resume: ShowArticleDTO;
  private uiBlocksSubscription: Subscription;
  public uiBlocks;

  public publishDate: string;
  constructor(
    private readonly router: Router,
    private readonly adminService: AdminService
  ) {}

  ngOnInit() {
    this.resume.content.text = `${this.resume.content.text.slice(0, 350)}...`;
    this.publishDate = moment(this.resume.datePublish).format('DD MMMM YYYY');
    this.uiBlocksSubscription = this.adminService.uiBlocks$.subscribe(
      blocks => {
        if (blocks) {
          this.uiBlocks = blocks;
        }
      }
    );
  }

  navigateArticle() {
    this.router.navigate(['articles', this.resume.id]);
  }

  ngOnDestroy() {
    this.uiBlocksSubscription.unsubscribe();
  }
}
