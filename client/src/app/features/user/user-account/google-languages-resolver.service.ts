import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { NotificatorService } from '../../../core/services/notificator.service';
import { AdminService } from '../../admin/admin.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleLanguagesResolverService implements Resolve<object> {

  constructor(
    private readonly router: Router,
    private readonly adminService: AdminService,
    private readonly toastr: NotificatorService,
  ) {}

  resolve(): Observable<object> {

    return this.adminService.getGoogleLanguages().pipe(
      map(googleLanguages => {
        if (googleLanguages) {
          return googleLanguages;
        } else {
          this.router.navigate(['/home']);
          this.toastr.error('There was an unexpected error.');
          return;
        }
      })
    );
  }
}
