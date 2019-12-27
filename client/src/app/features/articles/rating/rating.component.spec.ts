import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingComponent } from './rating.component';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { NotificatorService } from '../../../core/services/notificator.service';
import { RatingService } from '../rating.service';

describe('RatingComponent', () => {

  const ratingService = {
    getRate() {
      return of({ avgRate: 1 });
    },
    rate() {}
  };

  const notification = {
    success() { },
    error() { },
  };

  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(async(() => {
    // clear all spies and mocks
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule,
      ],
      declarations: [RatingComponent],
      providers: [
        RatingService,
        NotificatorService,
      ],
    })
      .overrideProvider(RatingService, { useValue: ratingService })
      .overrideProvider(NotificatorService, { useValue: notification })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
