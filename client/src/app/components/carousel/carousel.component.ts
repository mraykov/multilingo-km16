import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../../features/admin/admin.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {
  public images: string[];
  private uiBlocksSubscription: Subscription;
  public uiBlocks;

  constructor(private readonly adminService: AdminService) {}

  ngOnInit() {
    this.images = [367, 445, 4].map(
      n => `https://picsum.photos/id/${n}/900/350?blur=2`
    );
    this.uiBlocksSubscription = this.adminService.uiBlocks$.subscribe(blocks => {
      if (blocks) {
        this.uiBlocks = blocks;
      }
    });

  }
  ngOnDestroy() {
    this.uiBlocksSubscription.unsubscribe();
  }
}
