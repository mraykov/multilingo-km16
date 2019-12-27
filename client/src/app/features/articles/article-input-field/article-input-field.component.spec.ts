import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleInputFieldComponent } from './article-input-field.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../admin/admin.service';
import { of } from 'rxjs';
import { ArticleDTO } from '../models/article.dto';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';

describe('ArticleInputFieldComponent', () => {

  const mockArticle = new ArticleDTO();
  mockArticle.title = { id: 1, text: 'String' };
  mockArticle.content = { id: 2, text: 'String' };

  const uiBlocks = {
    ARTICLE: 'strin',
    UPDATE_ARTICLE_TITLE: 'string',
    UPDATE_ARTICLE_CONTENT: 'string',
    SAVE: 'string',
  };

  let adminService;
  let modalService;
  let fb;

  let component: ArticleInputFieldComponent;
  let fixture: ComponentFixture<ArticleInputFieldComponent>;

  beforeEach(async(() => {
    // clear all spies and mocks
    jest.clearAllMocks();

    adminService = {
      uiBlocks$: of('Data'),
    };

    modalService = {
      dismissAll() { /* empty */ },
    };

    fb = {
      group() {
        return {
          setValue() {},
          value: 12,
        };
      }
    };

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
      ],
      declarations: [ ArticleInputFieldComponent ],
      providers: [
        NgbModal,
        FormBuilder,
      ]
    })
    .overrideProvider(AdminService, { useValue: adminService })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleInputFieldComponent);
    component = fixture.componentInstance;
    component.article = mockArticle;
    component.uiBlocks = uiBlocks;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
