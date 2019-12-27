import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../../features/admin/admin.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  private uiBlocksSubscription: Subscription;
  public uiBlocks;

  constructor(private readonly adminService: AdminService) {}
  ngOnInit() {
    this.uiBlocksSubscription = this.adminService.uiBlocks$.subscribe(
      blocks => {
        if (blocks) {
          this.uiBlocks = blocks;
        }
      }
    );
  }
  ngOnDestroy() {
    this.uiBlocksSubscription.unsubscribe();
  }
}
