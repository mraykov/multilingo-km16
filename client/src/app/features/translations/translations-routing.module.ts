import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslationsTableComponent } from './translations-table/translations-table.component';
import { TranslationsTableResolverService } from './translations-table/translations-table-resolver.service';
import { TranslationsInfoComponent } from './translations-info/translations-info.component';
import { TranslationsInfoResolverService } from './translations-info/translations-info-resolver.service';
import { EditorGuard } from '../../auth/editor.guard';
import { AuthGuard } from '../../auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard, EditorGuard],
    component: TranslationsTableComponent,
    resolve: { translations: TranslationsTableResolverService }
  },
  {
    path: ':id',
    canActivate: [AuthGuard, EditorGuard],
    component: TranslationsInfoComponent,
    resolve: { translation: TranslationsInfoResolverService }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslationsRoutingModule { }
