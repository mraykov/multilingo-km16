import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslationsInfoModalComponent } from './translations-info-modal.component';
import { of } from 'rxjs';
import { AdminService } from '../../admin/admin.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { TranslationDTO } from '../models/translation.dto';

describe('TranslationsInfoModalComponent', () => {

  const translation = new TranslationDTO();
  translation.translation = 'string';
  translation.targetLanguage = 'en';

  const adminService = {
    uiBlocks$: of('Data'),
  };

  let component: TranslationsInfoModalComponent;
  let fixture: ComponentFixture<TranslationsInfoModalComponent>;

  beforeEach(async(() => {
    // clear all spies and mocks
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule,
      ],
      declarations: [TranslationsInfoModalComponent],
      providers: [
        AdminService,
        NgbModal,
        FormBuilder,
      ],
    })
      .overrideProvider(AdminService, { useValue: adminService })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationsInfoModalComponent);
    component = fixture.componentInstance;
    component.translation = translation;
    fixture.detectChanges();
  });

  it('should create', (done) => {
    expect(component).toBeTruthy();

    done();
  });
});
