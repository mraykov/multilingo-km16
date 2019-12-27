import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from './features/user/models/uset';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private loggedInSubscription: Subscription;
  private userSubscription: Subscription;

  public loggedIn: boolean;
  public user: User;

  constructor(
    private readonly authService: AuthService,
  ) { }

  public ngOnInit() {
    this.loggedInSubscription = this.authService.isLoggedIn$.subscribe(
      loggedIn => this.loggedIn = loggedIn,
    );
    this.userSubscription = this.authService.loggedUser$.subscribe(
      user => this.user = user,
    );
  }

  public logout() {
    this.authService.logout();
  }

  public ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
