import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleInfoComponent } from './article-info.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { AdminService } from '../../admin/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs/internal/observable/of';
import { RouterTestingModule } from '@angular/router/testing';
import { ArticlesService } from '../articles.service';
import { NotificatorService } from '../../../core/services/notificator.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../user/models/uset';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { ArticleViewAllComponent } from '../article-view-all/article-view-all.component';
import { ArticleDTO } from '../models/article.dto';
import { ArticleInputFieldComponent } from '../article-input-field/article-input-field.component';
import { RatingComponent } from '../rating/rating.component';
import { ResumeModule } from '../../resume/resume.module';
import { HttpClientModule } from '@angular/common/http';
import { ModalDeleteComponent } from '../../../shared/components/modal-delete/modal-delete.component';
import { RatingService } from '../rating.service';
import { throwError } from 'rxjs';

describe('ArticleInfoComponent', () => {

  const routes: Routes = [
    { path: 'articles', component: ArticleViewAllComponent },
  ];

  const ratingService = {
    getRate() {
      return of({ avgRate: 1 });
    }
  };

  const mockArticleViewAllComponent = {};
  const mockRatingComponent = {};

  const mockArticle = new ArticleDTO();
  mockArticle.title = { id: 1, text: 'TitleArticle' };
  mockArticle.content = { id: 2, text: 'ContentArticle' };
  mockArticle.author = { username: 'string' };
  mockArticle.language = { language: 'en' };

  const route = {
    data: of({ article: mockArticle }),
    snapshot: {
      params: {
        id: '3'
      }
    }
  };

  const modalService = {
    open() { },
  };

  let router: Router;

  const articlesService = {
    getArticle() { return of(); },
    updateArticle() { },
    getOriginalArticle() { },
    deleteArticle() { },
  };

  const notificationService = {
    error() { },
    success() { },
  };

  const mockModalDeleteComponent = {};
  const mockArticleInputFieldComponent = {};

  const mockUser = new User();
  mockUser.username = 'String';

  const authService = {
    languagePreference$: of('en'),
    isLoggedIn$: of(true),
    loggedUser$: of(mockUser),
  };

  const adminService = {
    uiBlocks$: of('Data'),
  };

  let component: ArticleInfoComponent;
  let fixture: ComponentFixture<ArticleInfoComponent>;

  beforeEach(async(() => {
    // clear all spies and mocks
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ResumeModule,
        RouterTestingModule.withRoutes(routes),
        CommonModule,
        SharedModule,
      ],
      declarations: [ArticleInfoComponent, ArticleViewAllComponent, ArticleInputFieldComponent, RatingComponent],
      providers: [
        RatingService,
        AdminService,
        NgbModal,
        ArticlesService,
        NotificatorService,
        AuthService,
      ],
    })
      .overrideComponent(ArticleViewAllComponent, mockArticleViewAllComponent)
      .overrideComponent(ModalDeleteComponent, mockModalDeleteComponent)
      .overrideComponent(ArticleInputFieldComponent, mockArticleInputFieldComponent)
      .overrideProvider(ActivatedRoute, { useValue: route })
      .overrideProvider(ArticlesService, { useValue: articlesService })
      .overrideProvider(NotificatorService, { useValue: notificationService })
      .overrideProvider(AuthService, { useValue: authService })
      .overrideProvider(AdminService, { useValue: adminService })
      .overrideProvider(NgbModal, { useValue: modalService })
      .overrideProvider(RatingService, { useValue: ratingService })
      .compileComponents();

    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit() when initialize', () => {
    it('should define user and isLoggedin to be true', (done) => {
      // Assert
      expect(component.user).toBe(mockUser);
      expect(component.isLoggedIn).toBe(true);

      done();
    });

    it('should load data from resolver', (done) => {

      // Assert
      expect(component.article).toBeDefined();
      expect(component.translatedArticle).toBeDefined();

      done();
    });

    it('should load uiBlocks', (done) => {

      // Assert
      expect(component.uiBlocks).toBe('Data');

      done();
    });
  });

  describe('openArticleTextareaModal()', () => {
    it('should call modalService.open()', (done) => {
      // Arrange
      const mockUpdateArticle = {
        title: 'string',
        content: 'String',
      };
      const mockModalOpen = {
        result: Promise.resolve('Unused'),
        componentInstance: {
          updatedArticleEm: of(mockUpdateArticle),
          article: 'string',
        },
      };
      const spyModalOpen = jest.spyOn(modalService, 'open').mockImplementation(() => mockModalOpen);
      const spyArticleserviceUpdateArticle = jest.spyOn(articlesService, 'updateArticle').mockImplementation(() => of(mockArticle));

      // Act
      component.openArticleTextareaModal();

      // Assert
      expect(spyModalOpen).toBeCalled();
      expect(spyModalOpen).toBeCalledTimes(1);

      done();
    });

    it('should call notification.success with correct argumet', (done) => {
      // Arrange
      const mockUpdateArticle = {
        title: mockArticle.title.text,
        content: mockArticle.content.text,
      };
      const mockModalOpen = {
        result: Promise.resolve('Unused'),
        componentInstance: {
          updatedArticleEm: of(mockUpdateArticle),
          article: 'string',
        },
      };
      const spyModalOpen = jest.spyOn(modalService, 'open').mockImplementation(() => mockModalOpen);
      const spyArticleserviceUpdateArticle = jest.spyOn(articlesService, 'updateArticle').mockImplementation(() => of(mockArticle));
      const spyNotificationSuccess = jest.spyOn(notificationService, 'success');

      // Act
      component.openArticleTextareaModal();

      // Assert
      expect(spyNotificationSuccess).toBeCalledWith('Nothing to update!');
      expect(spyNotificationSuccess).toBeCalledTimes(1);

      done();
    });

    it('should call this.updateArticle(data) with correct argumet', (done) => {
      // Arrange
      const mockUpdateArticle = {
        title: 'string',
        content: 'String',
        language: 'en'
      };
      const mockModalOpen = {
        result: Promise.resolve('Unused'),
        componentInstance: {
          updatedArticleEm: of(mockUpdateArticle),
          article: 'string',
        },
      };
      const spyModalOpen = jest.spyOn(modalService, 'open').mockImplementation(() => mockModalOpen);
      const spyArticleserviceUpdateArticle = jest.spyOn(articlesService, 'updateArticle').mockImplementation(() => of(mockArticle));

      // Act
      component.openArticleTextareaModal();

      // Assert
      expect(spyArticleserviceUpdateArticle).toBeCalledWith(3, mockUpdateArticle);
      expect(spyArticleserviceUpdateArticle).toBeCalledTimes(1);

      done();
    });

    it('should call modalRef.result.finally', (done) => {
      // Arrange
      const mockUpdateArticle = {
        title: 'string',
        content: 'String',
      };
      const mockModalOpen = {
        result: Promise.resolve('Unused'),
        componentInstance: {
          updatedArticleEm: of(mockUpdateArticle),
          article: 'string',
        },
      };
      const spyMockModalOpen = jest.spyOn(mockModalOpen.result, 'finally');
      const spyModalOpen = jest.spyOn(modalService, 'open').mockImplementation(() => mockModalOpen);
      const spyArticleserviceUpdateArticle = jest.spyOn(articlesService, 'updateArticle').mockImplementation(() => of(mockArticle));

      // Act
      component.openArticleTextareaModal();

      // Assert
      expect(spyMockModalOpen).toBeCalled();
      expect(spyMockModalOpen).toBeCalledTimes(1);

      done();
    });

    it('should call notification.error when subscribe to modalRef.componentInstance.updatedArticleEm', (done) => {
      // Arrange
      const mockUpdateArticle = {
        title: 'string',
        content: 'String',
      };
      const mockModalOpen = {
        result: Promise.resolve('Unused'),
        componentInstance: {
          updatedArticleEm: throwError(new Error('Somejs')),
          article: 'string',
        },
      };
      const spyMockModalOpen = jest.spyOn(mockModalOpen.result, 'finally');
      const spyModalOpen = jest.spyOn(modalService, 'open').mockImplementation(() => mockModalOpen);
      const spyArticleserviceUpdateArticle = jest.spyOn(articlesService, 'updateArticle').mockImplementation(() => of(mockArticle));
      const spyNotificationError = jest.spyOn(notificationService, 'error');

      // Act
      component.openArticleTextareaModal();

      // Assert
      expect(spyNotificationError).toBeCalledWith('Something went wrong with article modal!');
      expect(spyNotificationError).toBeCalledTimes(1);

      done();
    });

  });

  describe('editOriginalArticle()', () => {
    it('should call articlesService.getOriginalArticle when called once', (done) => {
      // Arrange
      const spyArticleservicegetOriginalArticle = jest.spyOn(articlesService, 'getOriginalArticle')
      .mockImplementation(() => of(mockArticle));

      // Act
      component.editOriginalArticle();

      // Assert
      expect(spyArticleservicegetOriginalArticle).toBeCalledWith(3);
      expect(spyArticleservicegetOriginalArticle).toBeCalledTimes(1);

      done();
    });

    // tslint:disable-next-line: max-line-length
    it('should call articlesService.getOriginalArticle and this.article, this.originalArticle, ths.isOririginalArticle to be the correct type', (done) => {
      // Arrange
      const spyArticleservicegetOriginalArticle = jest.spyOn(articlesService, 'getOriginalArticle')
      .mockImplementation(() => of(mockArticle));

      // Act
      component.editOriginalArticle();

      // Assert
      expect(component.article).toBe(mockArticle);
      expect(component.originalArticle).toBe(mockArticle);
      expect(component.isOririginalArticle).toBe(true);

      done();
    });

    it('should call articlesService.getOriginalArticle and call notifiaction.error', (done) => {
      // Arrange
      const spyArticleservicegetOriginalArticle = jest.spyOn(articlesService, 'getOriginalArticle')
      .mockImplementation(() => throwError(new Error('some')));
      const spyNotificationError = jest.spyOn(notificationService, 'error');

      // Act
      component.editOriginalArticle();

      // Assert
      expect(spyNotificationError).toBeCalledWith('Something went wrong!');
      expect(spyNotificationError).toBeCalledTimes(1);

      done();
    });

    it('should call articlesService.getOriginalArticle once and called twice', (done) => {
      // Arrange
      const spyArticleservicegetOriginalArticle = jest.spyOn(articlesService, 'getOriginalArticle')
      .mockImplementation(() => of(mockArticle));
      const spyNotificationError = jest.spyOn(notificationService, 'error');

      // Act
      component.editOriginalArticle();
      component.editOriginalArticle();

      // Assert
      expect(component.article).toBe(component.originalArticle);
      expect(spyArticleservicegetOriginalArticle).toBeCalledTimes(1);
      expect(component.isOririginalArticle).toBe(false);

      done();
    });
  });

  describe('deleteArticle()', () => {
    it('should call modalService.open()', (done) => {
      // Arrange
      const mockModalOpen = {
        componentInstance: {
          deleteEvent: of(false),
        },
      };
      const spyModalOpen = jest.spyOn(modalService, 'open').mockImplementation(() => mockModalOpen);
      const spyRouterNavigate = jest.spyOn(router, 'navigate');

      // Act
      component.deleteArticle();

      // Assert
      expect(spyModalOpen).toBeCalled();
      expect(spyModalOpen).toBeCalledTimes(1);

      done();
    });

    it('should call articlesServic.deleteArticle with correct argumet if data is true', (done) => {
      // Arrange
      const mockModalOpen = {
        componentInstance: {
          deleteEvent: of(this),
        },
      };
      const spyModalOpen = jest.spyOn(modalService, 'open').mockImplementation(() => mockModalOpen);
      const spyArticleServiceDelete = jest.spyOn(articlesService, 'deleteArticle').mockImplementation(() => of(true));
      const spyRouterNavigate = jest.spyOn(router, 'navigate');

      // Act
      component.deleteArticle();

      // Assert
      expect(spyArticleServiceDelete).toBeCalledWith(3);
      expect(spyArticleServiceDelete).toBeCalledTimes(1);

      done();
    });

    it('should call notification.success with correct argumet if data is true', (done) => {
      // Arrange
      const mockModalOpen = {
        componentInstance: {
          deleteEvent: of(this),
        },
      };
      const mockMSG = `Article with id: ${3} was deleted successfuly!`;
      const spyModalOpen = jest.spyOn(modalService, 'open').mockImplementation(() => mockModalOpen);
      const spyArticleServiceDelete = jest.spyOn(articlesService, 'deleteArticle').mockImplementation(() => of(true));
      const spyNotificationSuccess = jest.spyOn(notificationService, 'success');
      const spyRouterNavigate = jest.spyOn(router, 'navigate');

      // Act
      component.deleteArticle();

      // Assert
      expect(spyNotificationSuccess).toBeCalledWith(mockMSG);
      expect(spyNotificationSuccess).toBeCalledTimes(1);

      done();
    });

    it('should call router.navigate with correct argumet if data is true', (done) => {
      // Arrange
      const mockModalOpen = {
        componentInstance: {
          deleteEvent: of(this),
        },
      };
      const mockMSG = `Article with id: ${3} was deleted successfuly!`;
      const spyModalOpen = jest.spyOn(modalService, 'open').mockImplementation(() => mockModalOpen);
      const spyArticleServiceDelete = jest.spyOn(articlesService, 'deleteArticle').mockImplementation(() => of(true));
      const spyRouterNavigate = jest.spyOn(router, 'navigate');

      // Act
      component.deleteArticle();

      // Assert
      expect(spyRouterNavigate).toBeCalledWith(['articles']);
      expect(spyRouterNavigate).toBeCalledTimes(1);

      done();
    });

    it('should call notification.error with correct argumet if data is true', (done) => {
      // Arrange
      const mockModalOpen = {
        componentInstance: {
          deleteEvent: of('some'),
        },
      };
      const mockMSG = 'Something went wrong!';
      const spyModalOpen = jest.spyOn(modalService, 'open').mockImplementation(() => mockModalOpen);
      const spyArticleServiceDelete = jest.spyOn(articlesService, 'deleteArticle').mockImplementation(() => throwError(new Error('soem')));
      const spyNotificationError = jest.spyOn(notificationService, 'error');
      const spyRouterNavigate = jest.spyOn(router, 'navigate');

      // Act
      component.deleteArticle();

      // Assert
      expect(spyNotificationError).toBeCalledWith(mockMSG);
      expect(spyNotificationError).toBeCalledTimes(1);

      done();
    });

  });

  describe('', () => {
    it('should', (done) => {
      expect(true).toBe(true);
      done();
    });
  });


});
