import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../../auth/auth.guard';
import { UserArticlesComponent } from './user-articles/user-articles.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserArticlesResolverService } from './user-articles/user-articles-resolver.service';
import { UserAccountResolverService } from './user-account/user-account-resolver.service';
import { GoogleLanguagesResolverService } from './user-account/google-languages-resolver.service';
import { ActiveLanguagesResolverService } from './user-account/active-languages-resolver.service';

const userRoutes: Routes = [
  {
    path: 'articles',
    canActivate: [AuthGuard],
    component: UserArticlesComponent,
    resolve: { articles: UserArticlesResolverService }
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    component: UserAccountComponent,
    resolve: {
      user: UserAccountResolverService,
      languages: ActiveLanguagesResolverService,
      googleLanguages: GoogleLanguagesResolverService
    }
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(userRoutes)]
})
export class UserAccountRoutingModule {}
