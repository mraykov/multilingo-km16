import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShowUserDTO } from '../../../user/models/show-user.dto';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from '../../../../shared/components/modal-delete/modal-delete.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input() public user: ShowUserDTO;
  @Input() public userLoged;

  @Output() public deleteUser = new EventEmitter<ShowUserDTO>();
  @Output() public updateRole = new EventEmitter<ShowUserDTO>();


  public uiBlocksSubscription: Subscription;
  public uiBlocks;
  constructor(
    private readonly adminService: AdminService,
    private readonly modalService: NgbModal
  ) {}

  ngOnInit() {
    this.uiBlocksSubscription = this.adminService.uiBlocks$.subscribe(
      blocks => {
        if (blocks) {
          this.uiBlocks = blocks;
        }
      }
    );
    this.user.dateRegistration = moment(this.user.dateRegistration).format(
      'D/MMM/YYYY'
    );
  }

  public changeRole(role: string) {
    this.user.role.roleName = role;
    this.updateRole.emit(this.user);
  }

  public deleteModal() {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.deleteEvent.subscribe(data => {
      if (data) {
        this.deleteUser.emit(this.user);
      }
    });
  }

  public openModal(content, size) {
    this.modalService.open(content, { size, centered: true });
  }
}
