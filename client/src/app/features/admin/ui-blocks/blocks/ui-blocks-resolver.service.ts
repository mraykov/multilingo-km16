import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../../admin.service';
import { NotificatorService } from '../../../../core/services/notificator.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UiBlocksResolverService implements Resolve<object> {

  constructor(
    private readonly router: Router,
    private readonly adminService: AdminService,
    private readonly toastr: NotificatorService,
  ) {}

  resolve(): Observable<object> {
    return this.adminService.getUIBlocks('en-En').pipe(
      map(uiBlocks => {
        if (uiBlocks) {
          return uiBlocks;
        } else {
          this.router.navigate(['/home']);
          this.toastr.error('There was an unexpected error.');
          return;
        }
      })
    );
  }
}
