import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationsRoutingModule } from './translations-routing.module';
import { TranslationsInfoComponent } from './translations-info/translations-info.component';
import { TranslationsTableComponent } from './translations-table/translations-table.component';
import { SharedModule } from '../../shared/shared.module';
import { TranslationsService } from './translations.service';
import { TranslationsInfoResolverService } from './translations-info/translations-info-resolver.service';
import { TranslationsTableResolverService } from './translations-table/translations-table-resolver.service';
import { TranslationsInfoModalComponent } from './translations-info-modal/translations-info-modal.component';
import { NgbdSortableHeaderDirective } from './directive/sort-directive';



@NgModule({
  declarations: [
    TranslationsInfoComponent,
    TranslationsTableComponent,
    TranslationsInfoModalComponent,
    NgbdSortableHeaderDirective
  ],
  entryComponents: [TranslationsInfoModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    TranslationsRoutingModule,
  ],
  providers: [TranslationsService, TranslationsInfoResolverService, TranslationsTableResolverService],
})
export class TranslationsModule { }
