import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShowUIBlockDTO } from '../models/show-ui-block.dto';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificatorService } from '../../../../core/services/notificator.service';

@Component({
  selector: 'app-blocks-info',
  templateUrl: './blocks-info.component.html',
  styleUrls: ['./blocks-info.component.scss']
})
export class BlocksInfoComponent implements OnInit {
  @Input() public block: ShowUIBlockDTO;
  @Output() public saveBlock = new EventEmitter<void>();

  public updateBlock: FormGroup;
  public uiBlockSubscription: Subscription;
  public uiBlocks;
  public edit = false;

  constructor(
    private readonly adminService: AdminService,
    private readonly modalService: NgbModal,
    private readonly fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.uiBlockSubscription = this.adminService.uiBlocks$.subscribe(blocks => {
      this.uiBlocks = blocks;
    });

    this.updateBlock = this.fb.group({
      key: [this.block.key, Validators.compose([Validators.required])],
      content: [this.block.content, Validators.compose([Validators.required])]
    });
  }

  public toggle() {
    this.edit = !this.edit;
  }

public save() {
  this.saveBlock.emit(this.updateBlock.value);
}
  public openModal(content, size) {
    this.modalService.open(content, { size, centered: true });
  }
}
