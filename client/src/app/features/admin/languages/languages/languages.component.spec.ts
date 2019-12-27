import {  ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { LanguagesComponent } from './languages.component';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { LanguageInfoComponent } from '../language-info/language-info.component';
import { NotificatorService } from '../../../../core/services/notificator.service';
import { AdminService } from '../../admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';

describe('Languages Component', () => {
  const activatedRoute = {
    data: of({
      languages: [],
      googleLanguages: []
    })
  };

  let languages = [];
  const googleLanguages = [];
  let fixture: ComponentFixture<LanguagesComponent>;
  let component: LanguagesComponent;
  let adminService;
  let toastr;
  let uiBlocks;

  beforeEach(async(() => {
    jest.clearAllMocks();
    languages = [];
    uiBlocks = [];
    adminService = {
      get uiBlocks$() {
        return of('Data');
      },

      changeStatus() {
        /* emtpy */
      },
      deleteLanguage() {
        /* empty */
      },
      addLanguage() {
        /* emtpy */
      },
      getSupportedLanguages() {
        /* emtpy */
      }
    };

    toastr = {
      success() {
        /* emtpy */
      },
      error() {
        /* empty */
      }
    };

    TestBed.configureTestingModule({
      imports: [CommonModule, SharedModule, RouterTestingModule],
      declarations: [LanguagesComponent, LanguageInfoComponent],
      providers: [AdminService, NotificatorService, FormBuilder]
    })
      .overrideProvider(ActivatedRoute, { useValue: activatedRoute })
      .overrideProvider(AdminService, { useValue: adminService })
      .overrideProvider(NotificatorService, { useValue: toastr })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    // Arrange & Act & Assert
    expect(component).toBeDefined();
  });
  describe('ngOnInit() method', () => {
    it('Should initialize correctly with Supported Languages data passed from the resolver', () => {
      // Arange
      jest
        .spyOn(adminService, 'getSupportedLanguages')
        .mockReturnValue(of(languages));
      // Act
      component.ngOnInit();
      // Assert
      expect(component.languages).toEqual(languages);
    });
    it('Should initialize correctly with Google Languages data passed from the resolver', () => {
      // Arange
      jest
        .spyOn(adminService, 'getSupportedLanguages')
        .mockReturnValue(of(languages));
      // Act
      component.ngOnInit();
      // Assert
      expect(component.googleLanguages).toEqual(googleLanguages);
    });
    it('Should initialize correctly with the date passed from the UI Blocks subscription', () => {
      // Arrange
      jest
        .spyOn(adminService, 'uiBlocks$', 'get')
        .mockReturnValue(of(uiBlocks));
      // Act
      component.ngOnInit();
      // Assert
      expect(component.uiBlocks).toEqual(uiBlocks);
    });
  });

  describe('changeStatus() method', () => {
    it("Should call Admin Service's chageStatus() method once with the correct arguments", () => {
      // Arange
      const fakeLanguage = {
        id: 1,
        language: 'en',
        isActive: true,
        isDeleted: false
      };
      const spy = jest
        .spyOn(adminService, 'changeStatus')
        .mockReturnValue(of(fakeLanguage));
      // Act
      component.changeStatus(fakeLanguage);
      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(fakeLanguage);
    });
    it("Should call Admin Service's chageStatus() method and return the correct value", () => {
      // Arange
      component.languages = [
        {
          id: 1,
          language: 'English',
          isActive: true,
          isDeleted: false
        }
      ];
      const fakeLanguage = {
        id: 1,
        language: 'English',
        isActive: true,
        isDeleted: false
      };
      const fakeResponse = {
        id: 1,
        language: 'English',
        isActive: false,
        isDeleted: false
      };
      jest
        .spyOn(adminService, 'changeStatus')
        .mockReturnValue(of(fakeResponse));
      // Act
      component.changeStatus(fakeLanguage);
      // Assert
      expect(component.languages).toEqual([fakeResponse]);
    });
  });
  describe('deleteLanguage() method', () => {
    it("Should call admin Service's deleteLanguage() method once with the correct parameters", () => {
      // Arrange
      const fakeLanguage = {
        id: 1,
        language: 'English',
        isActive: true,
        isDeleted: false
      };
      const spy = jest
        .spyOn(adminService, 'deleteLanguage')
        .mockReturnValue(of(fakeLanguage));
      // Act
      component.deleteLanguage(fakeLanguage);
      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(fakeLanguage);
    });
    it("Should call Admin Service's deleteLanguage() method and return the correct value", () => {
      // Arange
      component.languages = [
        {
          id: 1,
          language: 'English',
          isActive: true,
          isDeleted: false
        }
      ];
      const fakeLanguage = {
        id: 1,
        language: 'English',
        isActive: true,
        isDeleted: false
      };
      const fakeResponse = {
        id: 1,
        language: 'English',
        isActive: false,
        isDeleted: false
      };
      jest
        .spyOn(adminService, 'deleteLanguage')
        .mockReturnValue(of(fakeResponse));
      // Act
      component.deleteLanguage(fakeLanguage);
      // Assert
      expect(component.languages).toEqual([]);
    });
  });



  describe('addLanguage() method', () => {
    it("Should call admin Service's addLanguage() method once", () => {
      // Arrange
      const fakeLanguage = {
        language: 'English',
      };
      const fakeResponse = {
        id: 1,
        language: 'English',
        isActive: true,
        isDeleted: false
      };
      const spy = jest
        .spyOn(adminService, 'addLanguage')
        .mockReturnValue(of(fakeResponse));
      // Act
      component.addLanguageForm.setValue(fakeLanguage);
      component.addLanguage();
      // Assert
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(fakeLanguage);
    });
    it("Should call Admin Service's addLanguage() method and return the correct value", () => {
      // Arange
      component.languages = [
      ];
      const fakeLanguage = {
        language: 'English',
      };
      const fakeResponse = {
        id: 1,
        language: 'English',
        isActive: true,
        isDeleted: false
      };
      jest
        .spyOn(adminService, 'addLanguage')
        .mockReturnValue(of(fakeResponse));
      // Act
      component.addLanguageForm.setValue(fakeLanguage);
      component.addLanguage();
      // Assert
      expect(component.languages).toEqual([fakeResponse]);
    });
  });
});
