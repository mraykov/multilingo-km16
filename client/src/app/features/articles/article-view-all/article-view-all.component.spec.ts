import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleViewAllComponent } from './article-view-all.component';
import { AdminService } from '../../admin/admin.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { ResumeModule } from '../../resume/resume.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../../core/services/auth.service';
import { ArticlesService } from '../articles.service';

describe('ArticleViewAllComponent', () => {

  let authService;
  let articlesService;
  let adminService;

  const activatedRoute = {
    data: of({ resumes: [] }),
  };


  let component: ArticleViewAllComponent;
  let fixture: ComponentFixture<ArticleViewAllComponent>;

  beforeEach(async(() => {
    // clear all spies and mocks
    jest.clearAllMocks();

    adminService = {
      uiBlocks$: of('Data'),
    };

    authService = {
      languagePreference$: of()
    };

    articlesService = {
      getAllArticles() { return of(); }
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,
        SharedModule,
        ResumeModule,
      ],
      declarations: [ArticleViewAllComponent],
      providers: [
        AdminService,
        AuthService,
        ArticlesService,
      ],
    })
      .overrideProvider(AdminService, { useValue: adminService })
      .overrideProvider(AuthService, { useValue: authService })
      .overrideProvider(ArticlesService, { useValue: articlesService })
      .overrideProvider(ActivatedRoute, { useValue: activatedRoute })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
