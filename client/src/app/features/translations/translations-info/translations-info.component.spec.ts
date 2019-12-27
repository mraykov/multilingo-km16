import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationsInfoComponent } from './translations-info.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { TranslationsService } from '../translations.service';
import { NotificatorService } from '../../../core/services/notificator.service';
import { AdminService } from '../../admin/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { TranslationDTO } from '../models/translation.dto';

describe('TranslationsInfoComponent', () => {

  const routes: Routes = [
    { path: ':id', component: TranslationsInfoComponent },
  ];

  const adminService = {
    uiBlocks$: of('Data'),
  };

  const translationsService = {
    editTranslationById() {},
  };

  const notification = {
    error() { },
    success() { },
  };

  const translation = new TranslationDTO();
  translation.translation = 'string';
  translation.targetLanguage = 'en';

  const route = {
    data: of({ translations: [ translation ] }),
    snapshot: {
      params: {
        id: '1'
      }
    }
  };

  let router: Router;

  let component: TranslationsInfoComponent;
  let fixture: ComponentFixture<TranslationsInfoComponent>;

  beforeEach(async(() => {
    // clear all spies and mocks
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        CommonModule,
        SharedModule,
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [ TranslationsInfoComponent ],
      providers: [
        TranslationsService,
        NotificatorService,
        AdminService,
        NgbModal,
      ]
    })
    .overrideProvider(ActivatedRoute, { useValue: route })
    .overrideProvider(AdminService, { useValue: adminService })
    .overrideProvider(NotificatorService, { useValue: notification })
    .overrideProvider(TranslationsService, { useValue: translationsService })
    .compileComponents();

    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
