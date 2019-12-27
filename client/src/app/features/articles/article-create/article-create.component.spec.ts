import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCreateComponent } from './article-create.component';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ArticlesService } from '../articles.service';
import { NotificatorService } from '../../../core/services/notificator.service';
import { LanguagesService } from '../../../core/services/languages.service';
import { AdminService } from '../../admin/admin.service';
import { of } from 'rxjs';
import { LanguageDTO } from '../../translations/models/languages/language.dto';
import { AuthService } from '../../../core/services/auth.service';

describe('ArticleCreateComponent', () => {
  let authService;
  let articlesService;
  let notification;
  let languagesService;
  let adminService;

  const languageDTO = new LanguageDTO();
  languageDTO.id = 1;
  languageDTO.language = 'en';
  languageDTO.isActive = 'true';

  let component: ArticleCreateComponent;
  let fixture: ComponentFixture<ArticleCreateComponent>;

  beforeEach(async(() => {
    // clear all spies and mocks
    jest.clearAllMocks();

    authService = {
      languagePreference$: of(),
    };
    adminService = {
      uiBlocks$: of('Data'),
    };
    languagesService = {
      detectLanguage() { },
      getAllSupportedLanguages() {
        return of([languageDTO]);
      }
    };
    notification = {
      success() { },
      error() { },
    };
    articlesService = {
      createArticle() { }
    };

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule,
      ],
      declarations: [ArticleCreateComponent],
      providers: [
        FormBuilder,
        ArticlesService,
        NotificatorService,
        LanguagesService,
        AdminService,
        AuthService,
      ],
    })
      .overrideProvider(ArticlesService, { useValue: articlesService })
      .overrideProvider(NotificatorService, { useValue: notification })
      .overrideProvider(LanguagesService, { useValue: languagesService })
      .overrideProvider(AdminService, { useValue: adminService })
      .overrideProvider(AuthService, { useValue: authService })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
