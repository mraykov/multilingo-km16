import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowUserDTO } from '../../../user/models/show-user.dto';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { NotificatorService } from '../../../../core/services/notificator.service';
import { AuthService } from '../../../../core/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  public users: ShowUserDTO[];
  public filtered: ShowUserDTO[];
  public uiBlocksSubscription: Subscription;
  public userSubscription: Subscription;
  public userLoged;

  public uiBlocks;

  constructor(
    private readonly router: ActivatedRoute,
    private readonly adminService: AdminService,
    private readonly toastr: NotificatorService,
    private readonly authService: AuthService,
    private readonly modalService: NgbModal
  ) {}

  ngOnInit() {
    this.router.data.subscribe(({ users }) => {
      this.users = users;
      this.filtered = users;
      this.filtered.sort((a, b) => {
        const nameA = a.firstName.toLocaleLowerCase();
        const nameB = b.firstName.toLocaleLowerCase();
        if (nameA < nameB) {
          return -1;
        }
      });
    });
    this.uiBlocksSubscription = this.adminService.uiBlocks$.subscribe(
      blocks => {
        if (blocks) {
          this.uiBlocks = blocks;
        }
      }
    );
    this.userSubscription = this.authService.loggedUser$.subscribe(
      user => (this.userLoged = user)
    );
  }

  public searchUser(content: string) {
    if (!content) {
      this.filtered = this.users;
    } else {
      this.filtered = this.users.filter(user =>
        user.username.toLowerCase().includes(content.toLowerCase())
      );
    }
  }

  public delete(user: ShowUserDTO) {
    this.adminService.deleteUser(user.id).subscribe(res => {
      const [deleted] = this.users.filter(u => u.id === res.id);
      const idx = this.users.indexOf(deleted);
      this.users.splice(idx, 1, res);
      this.toastr.success('User deleted successfully');
    });
  }

  public updateRole(user: ShowUserDTO) {
    this.adminService.updateUser(user).subscribe(
      res => {
        const [found] = this.users.filter(u => u.id === res.id);
        const idx = this.users.indexOf(found);
        this.users.splice(idx, 1, res);
        this.toastr.success('The role was changed successfully');
      },
      error => {
        this.toastr.error(error.error.error);
      },
      () => { this.modalService.dismissAll(); }
    );
  }

  ngOnDestroy() {
    this.uiBlocksSubscription.unsubscribe();
  }
}
