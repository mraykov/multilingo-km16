import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocksInfoComponent } from './blocks-info.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { AdminService } from '../../admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { NotificatorService } from '../../../../core/services/notificator.service';
import { ShowUIBlockDTO } from '../models/show-ui-block.dto';
import { of } from 'rxjs';

describe('BlocksInfoComponent', () => {

  const block = new ShowUIBlockDTO();

  const notification = {};

  const adminService = {
    uiBlocks$: of('Data'),
  };

  let component: BlocksInfoComponent;
  let fixture: ComponentFixture<BlocksInfoComponent>;

  beforeEach(async(() => {
    // clear all spies and mocks
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule,
      ],
      declarations: [ BlocksInfoComponent ],
      providers: [
        AdminService,
        NgbModal,
        FormBuilder,
        NotificatorService,
      ],
    })
    .overrideProvider(AdminService, { useValue: adminService })
    .overrideProvider(NotificatorService, { useValue: notification })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocksInfoComponent);
    component = fixture.componentInstance;
    component.block = block;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
