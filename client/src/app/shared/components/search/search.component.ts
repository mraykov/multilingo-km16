import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../../../features/admin/admin.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() search = new EventEmitter<string>();

  public keyword = '';
  public uiBlocksSubscription: Subscription;
  public uiBlocks;

  constructor(private readonly adminService: AdminService) {}

  ngOnInit() {
    this.uiBlocksSubscription = this.adminService.uiBlocks$.subscribe(blocks => {
      if (blocks) {
        this.uiBlocks = blocks;
      }
    });
  }

  public triggerSearch(value: string) {
    this.search.emit(value);
  }
}
