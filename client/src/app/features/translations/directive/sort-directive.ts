import { rotate, SortDirection, SortEvent } from './sort-methods';
import { EventEmitter, Directive, Input, Output, HostListener } from '@angular/core';

@Directive({
  selector: 'th [appSortable]',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeaderDirective {

  @Input() appSortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.appSortable, direction: this.direction });
  }
}
