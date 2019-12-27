import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminGuard } from '../../auth/admin.guard';
import { AuthGuard } from '../../auth/auth.guard';
import { UiBlocksComponent } from './ui-blocks/blocks/ui-blocks.component';
import { RouterModule } from '@angular/router';
import { UiBlocksResolverService } from './ui-blocks/blocks/ui-blocks-resolver.service';
import { UsersComponent } from './users/users/users.component';
import { UsersResolverService } from './users/users/users-resolver.service';
import { LanguagesComponent } from './languages/languages/languages.component';
import { LanguagesResolverService } from './languages/languages/languages-resolver.service';
import { GoogleLanguagesResolverService } from '../user/user-account/google-languages-resolver.service';

const adminRoutes = [
  {
    path: 'ui-blocks',
    canActivate: [AuthGuard, AdminGuard],
    component: UiBlocksComponent,
    resolve: { uiBlocks: UiBlocksResolverService }
  },
  {
    path: 'users',
    canActivate: [AuthGuard, AdminGuard],
    component: UsersComponent,
    resolve: {users: UsersResolverService}
  },
  {
    path: 'languages',
    canActivate: [AuthGuard, AdminGuard],
    component: LanguagesComponent,
    resolve: {languages: LanguagesResolverService, googleLanguages: GoogleLanguagesResolverService}
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(adminRoutes)]
})
export class AdminRoutingModule {}
