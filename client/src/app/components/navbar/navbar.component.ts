import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../features/admin/admin.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() public loggedIn: boolean;

  @Output() public toggleMenu = new EventEmitter<void>();
  @Output() public logout = new EventEmitter<void>();

  private userSubscription: Subscription;
  private uiBlocksSubscription: Subscription;
  public uiBlocks;
  public user;

  constructor(
    private readonly modalService: NgbModal,
    private readonly authService: AuthService,
    private readonly adminService: AdminService,
  ) {

  }

  ngOnInit() {
    this.userSubscription = this.authService.loggedUser$.subscribe(user => {
      this.user = user;
    });
    this.uiBlocksSubscription = this.adminService.uiBlocks$.subscribe(blocks => {
      if (blocks) {
        this.uiBlocks = blocks;
      }
    });
  }

  public triggerToggleMenu() {
    this.toggleMenu.emit();
  }

  public triggerLogout() {
    this.logout.emit();
  }

  public loginModal(content: any) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  public ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.uiBlocksSubscription.unsubscribe();
  }

}
