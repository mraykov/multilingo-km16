import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountRoutingModule } from './user-rounting.module';
import { SharedModule } from '../../shared/shared.module';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserArticlesComponent } from './user-articles/user-articles.component';
import { UserAccountService } from './user-account.service';



@NgModule({
  declarations: [UserAccountComponent, UserArticlesComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserAccountRoutingModule
  ],
  providers: [UserAccountService]
})
export class UserModule { }
