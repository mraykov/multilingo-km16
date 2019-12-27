import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { NotificatorService } from '../../../core/services/notificator.service';
import { ShowLanguagesDTO } from '../../admin/languages/models/show-languages.dto';
import { AdminService } from '../../admin/admin.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveLanguagesResolverService implements Resolve<ShowLanguagesDTO[]> {

  constructor(
    private readonly router: Router,
    private readonly adminService: AdminService,
    private readonly toastr: NotificatorService,
  ) {}

  resolve(): Observable<ShowLanguagesDTO[]> {

    return this.adminService.getActiveLanguages().pipe(
      map(languages => {
        if (languages) {
          return languages;
        } else {
          this.router.navigate(['/home']);
          this.toastr.error('There was an unexpected error.');
          return;
        }
      })
    );
  }
}
