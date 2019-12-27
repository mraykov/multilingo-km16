import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleInfoComponent } from './article-info/article-info.component';
import { ArticleInfoResolverService } from './article-info/article-info-resolver.service';
import { ArticleViewAllComponent } from './article-view-all/article-view-all.component';
import { ArticleViewAllResolverService } from './article-view-all/article-view-all-resolver.service';
import { ArticleCreateComponent } from './article-create/article-create.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: ArticleViewAllComponent, resolve: { resumes: ArticleViewAllResolverService } },
  { path: 'create', component: ArticleCreateComponent },
  { path: ':id', component: ArticleInfoComponent, resolve: { article: ArticleInfoResolverService } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
