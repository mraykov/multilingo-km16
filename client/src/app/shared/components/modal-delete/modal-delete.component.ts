import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AdminService } from '../../../features/admin/admin.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit, OnDestroy {
  public deleteEvent = new EventEmitter<boolean>();

  private uiBlocksSubscription: Subscription;
  public uiBlocks;

  constructor(
    private readonly modalService: NgbModal,
    private readonly adminService: AdminService,
  ) {}

  public ngOnInit() {
    this.uiBlocksSubscription = this.adminService.uiBlocks$.subscribe(blocks => {
      if (blocks) {
        this.uiBlocks = blocks;
      }
    });
  }

  public close() {
    this.modalService.dismissAll();
  }

  public delete() {
    this.deleteEvent.emit(true);
    this.modalService.dismissAll();
  }

  public ngOnDestroy() {
    this.uiBlocksSubscription.unsubscribe();
  }

}
