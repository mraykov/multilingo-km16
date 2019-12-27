import { Component, OnInit, Input } from '@angular/core';
import { RatingService } from '../rating.service';
import { NotificatorService } from '../../../core/services/notificator.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() public translationId: number;
  public avgRate = 0;
  public currentRate = 0;

  public constructor(
    private readonly ratingService: RatingService,
    private readonly notification: NotificatorService,
  ) {}

  public ngOnInit() {
    this.ratingService.getRate(this.translationId)
    .subscribe(
      rate => {
        this.avgRate = rate.avgRate;
      },
      err => this.notification.error('Something went wrong!')
      );
  }

  public rateIt(ratedNum: number) {
    if (this.avgRate) {
      this.ratingService.rate({ translationId: this.translationId, rate: ratedNum})
      .subscribe(
        rated => { this.avgRate = rated.avgRate; },
        err => this.notification.error('Something went wrong!')
        );
    } else {
      this.avgRate = 0;
    }
  }

}
