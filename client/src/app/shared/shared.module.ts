import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxStarsModule } from 'ngx-stars';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SearchComponent } from './components/search/search.component';
import { RouterModule } from '@angular/router';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';

@NgModule({
  declarations: [SearchComponent, ModalDeleteComponent],
  entryComponents: [ModalDeleteComponent],
  imports: [
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbModule,
    NgxStarsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
  ],
  exports: [
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgbModule,
    NgxStarsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    SearchComponent,
    ModalDeleteComponent
  ]
})
export class SharedModule {}
