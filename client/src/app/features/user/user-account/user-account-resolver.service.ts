import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { UserAccountService } from '../user-account.service';
import { map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { ShowUserDTO } from '../models/show-user.dto';
import { NotificatorService } from '../../../core/services/notificator.service';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccountResolverService implements Resolve<ShowUserDTO> {
  public userSubscription: Subscription;
  public user;

  constructor(
    private readonly router: Router,
    private readonly userAccountService: UserAccountService,
    private readonly toastr: NotificatorService,
    private readonly authService: AuthService
  ) {}

  resolve(): Observable<ShowUserDTO> {
    this.authService.loggedUser$.subscribe(user => {
      this.user = user;
    });
    return this.userAccountService.getUserDetails(this.user.id).pipe(
      map(user => {
        if (user) {
          return user;
        } else {
          this.router.navigate(['/home']);
          this.toastr.error('There was an unexpected error.');
          return;
        }
      })
    );
  }
}
