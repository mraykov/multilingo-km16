import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationsTableComponent } from './translations-table.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificatorService } from '../../../core/services/notificator.service';
import { AdminService } from '../../admin/admin.service';
import { LanguagesService } from '../../../core/services/languages.service';
import { TranslationsService } from '../translations.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { TranslationDTO } from '../models/translation.dto';
import { LanguageDTO } from '../models/languages/language.dto';
import { RouterTestingModule } from '@angular/router/testing';

describe('TranslationsTableComponent', () => {

  const translation = new TranslationDTO();
  translation.text = 'sssss';
  translation.translation = 'sasf';

  const route = {
    data: of({ translations: [translation] }),
    snapshot: {
      params: {
        id: '1'
      }
    }
  };

  let router: Router;

  const languagesService = {
    getAllSupportedLanguages() {
      return of([new LanguageDTO()]);
    }
  };

  const translationsService = {
    getAllTranslations() {},
  };

  const adminService = {
    uiBlocks$: of('Data'),
  };

  const notificationService = {
    error() { },
    success() { },
  };

  let component: TranslationsTableComponent;
  let fixture: ComponentFixture<TranslationsTableComponent>;

  beforeEach(async(() => {
    // clear all spies and mocks
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        CommonModule,
        SharedModule,
      ],
      declarations: [ TranslationsTableComponent ],
      providers: [
        NotificatorService,
        AdminService,
        LanguagesService,
        TranslationsService,
      ]
    })
    .overrideProvider(ActivatedRoute, { useValue: route })
    .overrideProvider(NotificatorService, { useValue: notificationService })
    .overrideProvider(AdminService, { useValue: adminService })
    .overrideProvider(LanguagesService, { useValue: languagesService })
    .overrideProvider(TranslationsService, { useValue: translationsService })
    .compileComponents();

    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
