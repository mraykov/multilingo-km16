import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleInfoComponent } from './article-info/article-info.component';
import { SharedModule } from '../../shared/shared.module';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticleInputFieldComponent } from './article-input-field/article-input-field.component';
import { ArticlesService } from './articles.service';
import { ArticleInfoResolverService } from './article-info/article-info-resolver.service';
import { ArticleViewAllComponent } from './article-view-all/article-view-all.component';
import { ResumeModule } from '../resume/resume.module';
import { ArticleViewAllResolverService } from './article-view-all/article-view-all-resolver.service';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { RatingComponent } from './rating/rating.component';
import { RatingService } from './rating.service';



@NgModule({
  declarations: [ArticleInfoComponent, ArticleInputFieldComponent, ArticleViewAllComponent, ArticleCreateComponent, RatingComponent],
  entryComponents: [ArticleInputFieldComponent],
  imports: [
    CommonModule,
    SharedModule,
    ArticlesRoutingModule,
    ResumeModule,
  ],
  providers: [ArticlesService, ArticleInfoResolverService, ArticleViewAllResolverService, RatingService],
})
export class ArticlesModule { }
