import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShowUserDTO } from '../../../user/models/show-user.dto';
import { AdminService } from '../../admin.service';
import { NotificatorService } from '../../../../core/services/notificator.service';

@Injectable({
  providedIn: 'root'
})
export class UsersResolverService implements Resolve<ShowUserDTO[]> {

  constructor(
    private readonly router: Router,
    private readonly adminService: AdminService,
    private readonly toastr: NotificatorService,
  ) {}

  resolve(): Observable<ShowUserDTO[]> {
    return this.adminService.getAllUsers().pipe(
      map(users => {
        if (users) {
          return users;
        } else {
          this.router.navigate(['/home']);
          this.toastr.error('There was an unexpected error.');
          return;
        }
      })
    );
  }
}
