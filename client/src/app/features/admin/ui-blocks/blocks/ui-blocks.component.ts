import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { ActivatedRoute } from '@angular/router';
import { ShowUIBlockDTO } from '../models/show-ui-block.dto';
import { NotificatorService } from '../../../../core/services/notificator.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ui-blocks',
  templateUrl: './ui-blocks.component.html',
  styleUrls: ['./ui-blocks.component.scss']
})
export class UiBlocksComponent implements OnInit {
  public createUIForm: FormGroup;

  public uiBlockSubscription: Subscription;
  public edit = false;
  public uiBlocks;
  public enBlocks: ShowUIBlockDTO[];
  public filtered: ShowUIBlockDTO[];

  constructor(
    private readonly fb: FormBuilder,
    private readonly adminService: AdminService,
    private readonly route: ActivatedRoute,
    private readonly toastr: NotificatorService,
    private readonly modalService: NgbModal
  ) {
    this.createUIForm = this.fb.group({
      key: ['', Validators.compose([Validators.required])],
      content: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.route.data.subscribe(({ uiBlocks }) => {
      this.enBlocks = uiBlocks;
      this.filtered = uiBlocks;
      this.filtered.sort((a, b) => {
        const nameA = a.content.toLocaleLowerCase();
        const nameB = b.content.toLocaleLowerCase();
        if (nameA < nameB) {
          return -1;
        }
      });
    });
    this.uiBlockSubscription = this.adminService.uiBlocks$.subscribe(blocks => {
      this.uiBlocks = blocks;
    });
  }

  public addUiBlock() {
    this.adminService.addUIBlock(this.createUIForm.value).subscribe(
      res => {
        this.enBlocks.unshift(res);
        this.filtered = this.enBlocks;
        this.toastr.success('Block added successfully');
      },
      error => {
        this.toastr.error(error.error.error);
      },
      () => {
        this.createUIForm.reset();
      }
    );
  }
  public save(block) {
    this.adminService.editBlock(block).subscribe(
      res => {
        const [filtered] = this.enBlocks.filter(b => b.key === res.key);
        const idx = this.enBlocks.indexOf(filtered);
        this.enBlocks.splice(idx, 1, res);
        this.toastr.success('Update successful!');
      },
      error => {
        this.toastr.error(error.error.error);
      },
      () => {
        this.edit = !this.edit;
        this.modalService.dismissAll();
      }
    );
  }
  public searchBlock(key: string) {
    if (!key) {
      this.filtered = this.enBlocks;
    } else {
      this.filtered = this.enBlocks.filter(block =>
        block.key.toLowerCase().includes(key.toLowerCase())
      );
    }
  }
}
