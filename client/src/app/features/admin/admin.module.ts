import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiBlocksComponent } from './ui-blocks/blocks/ui-blocks.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { BlocksInfoComponent } from './ui-blocks/blocks-info/blocks-info.component';
import { UsersComponent } from './users/users/users.component';
import { UserInfoComponent } from './users/user-info/user-info.component';
import { LanguagesComponent } from './languages/languages/languages.component';
import { LanguageInfoComponent } from './languages/language-info/language-info.component';

@NgModule({
  declarations: [
    UiBlocksComponent,
    BlocksInfoComponent,
    UsersComponent,
    UserInfoComponent,
    LanguagesComponent,
    LanguageInfoComponent
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule]
})
export class AdminModule {}
