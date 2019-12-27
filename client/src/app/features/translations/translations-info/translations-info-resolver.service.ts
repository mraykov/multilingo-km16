import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { NotificatorService } from 'src/app/core/services/notificator.service';
import { map } from 'rxjs/operators';
import { TranslationsService } from '../translations.service';
import { TranslationDTO } from '../models/translation.dto';

@Injectable({
  providedIn: 'root'
})
export class TranslationsInfoResolverService implements Resolve<TranslationDTO> {
  constructor(
    private readonly router: Router,
    private readonly toastr: NotificatorService,
    private readonly translationsService: TranslationsService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ) {
    const translationId: number = +route.paramMap.get(`id`);
    return this.translationsService.getTranslationById(translationId).pipe(
      map(translation => {
        if (translation) {
          return translation;
        } else {
          this.router.navigate(['/home']);
          this.toastr.error('There was an unexpected error.');
          return;
        }
      })
    );
  }
}
