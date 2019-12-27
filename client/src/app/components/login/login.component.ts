import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AdminService } from '../../features/admin/admin.service';
import { AuthService } from '../../core/services/auth.service';
import { NotificatorService } from '../../core/services/notificator.service';
import { UserLoginDTO } from '../../features/user/models/user-login.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public checkPass: boolean;
  public uiBlocksSubscription: Subscription;
  public uiBlocks;

  constructor(
    private readonly authService: AuthService,
    private readonly toastr: NotificatorService,
    private readonly modalService: NgbModal,
    private readonly fb: FormBuilder,
    private readonly adminService: AdminService
  ) {
    this.loginForm = this.fb.group({
      username: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ]
    });

    this.registerForm = this.fb.group(
      {
        username: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)])
        ],
        email: ['', Validators.compose([Validators.email])],
        firstName: ['', Validators.compose([Validators.required])],
        lastName: ['', Validators.compose([Validators.required])],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)])
        ],
        confirmPassword: ['', Validators.compose([Validators.required])]
      },
      {
        validator: this.MustMatch('password', 'confirmPassword')
      }
    );
  }

  ngOnInit() {
    this.uiBlocksSubscription = this.adminService.uiBlocks$.subscribe(blocks => {
      if (blocks) {
        this.uiBlocks = blocks;
      }
    });
  }

  public MustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[confirmPassword];

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  public login(credentials?: UserLoginDTO) {
    this.authService.login(credentials || this.loginForm.value).subscribe(
      res => {
        this.toastr.success('Login successful');
      },
      err => {
        this.toastr.error(err.error.error);
      },
      () => this.modalService.dismissAll()
    );
  }

  public register() {
    const {
      username,
      password,
      email,
      firstName,
      lastName
    } = this.registerForm.value;
    const user = { username, password, email, firstName, lastName };
    this.authService.register(user).subscribe(
      () => this.toastr.success('Registered successfully'),
      e => {
        this.toastr.error(e.error.error);
      },
      () => {
        this.login({ username, password });
        this.modalService.dismissAll();
      }
    );
  }
}
