import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { of } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ResumeModule } from './features/resume/resume.module';
import { User } from './features/user/models/uset';
import { AdminService } from './features/admin/admin.service';
import { NotificatorService } from './core/services/notificator.service';
import { FormBuilder } from '@angular/forms';

describe('AppComponent', () => {
  let authService;
  let adminService;

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach((() => {
    jest.clearAllMocks();

    const user = new User();

    adminService = {
      uiBlocks$: of(),
    };

    authService = {
      isLoggedIn$: of(true),
      loggedUser$: of(user),
      logout() { },
    };

    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CoreModule,
        ResumeModule,
      ],
      declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        FooterComponent,
        LoginComponent,
        CarouselComponent,
      ],
      providers: [
        AuthService,
        AdminService,
        NotificatorService,
      ]
    })
      .overrideProvider(AuthService, { useValue: authService })
      .overrideProvider(AdminService, { useValue: authService })
      .overrideProvider(NotificatorService, { useValue: authService })
      .overrideProvider(FormBuilder, { useValue: authService })
      .overrideProvider(AuthService, { useValue: authService })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
      });
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

});
