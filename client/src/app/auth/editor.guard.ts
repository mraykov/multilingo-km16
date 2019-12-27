import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { NotificatorService } from '../core/services/notificator.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditorGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly toastr: NotificatorService,
    private readonly router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.loggedUser$.pipe(
      map(user => {
        if (user.role !== 'Editor') {
         if (user.role !== 'Admin') {
          this.router.navigate(['home']);
          this.toastr.error(`You are not authorized to access this page!`);
          return false;
         } else {
           return true;
         }
        } else {
          return true;
        }
      })
    );
  }
}
