import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserAccountService } from '../user-account.service';
import { NotificatorService } from '../../../core/services/notificator.service';
import * as moment from 'moment';
import { ShowUserDTO } from '../models/show-user.dto';
import { AdminService } from '../../admin/admin.service';
import { ShowLanguagesDTO } from '../../admin/languages/models/show-languages.dto';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  private uiBlocksSubscription: Subscription;
  public uiBlocks;
  public user;
  public supportedLanguages: ShowLanguagesDTO[];
  public googleLanguages;
  public userDetails: ShowUserDTO;
  public createDate;
  public changePassForm: FormGroup;
  public preferredLanguage: string;

  constructor(
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly userAccountService: UserAccountService,
    private readonly toastr: NotificatorService,
    private readonly adminService: AdminService,
    private readonly storage: StorageService
  ) {
    this.changePassForm = this.fb.group(
      {
        oldPassword: [
          '',
          Validators.compose([Validators.required, Validators.minLength(8)])
        ],
        newPassword: [
          '',
          Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)])
        ],
        confirmPassword: ['', Validators.compose([Validators.required])]
      },
      {
        validator: this.mustMatch('newPassword', 'confirmPassword')
      }
    );
  }

  ngOnInit() {
    this.route.data.subscribe(({ user }) => (this.userDetails = user));

    this.route.data.subscribe(
      ({ googleLanguages }) => (this.googleLanguages = googleLanguages)
    );

    this.route.data.subscribe(
      ({ languages }) =>
        (this.supportedLanguages = this.transformLanguage(
          this.googleLanguages,
          languages
        ))
    );

    this.createDate = moment(this.userDetails.dateRegistration).format(
      'DD-MM-YYYY'
    );
    this.uiBlocksSubscription = this.adminService.uiBlocks$.subscribe(
      blocks => {
        if (blocks) {
          this.uiBlocks = blocks;
        }
      }
    );
    this.userSubscription = this.authService.loggedUser$.subscribe(user => {
      this.user = user;
    });
    if (this.user.preferredLanguage) {
      this.preferredLanguage = this.findLanguage(
        this.googleLanguages,
        this.user.preferredLanguage
      );
    } else {
      this.preferredLanguage = this.uiBlocks.DEFAULT_LANGUAGE;
    }
  }

  public mustMatch(password: string, confirmPassword: string) {
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

  public changePassword() {
    const { oldPassword, newPassword } = this.changePassForm.value;
    const userId = this.user.id;
    const password = {
      oldPassword,
      newPassword
    };
    this.userAccountService.changePassword(userId, password).subscribe(
      res => {
        this.toastr.success('Password changed successfully');
      },
      err => {
        this.toastr.error(err.error.error);
      },
      () => {
        this.changePassForm.reset();
      }
    );
  }

  public changeLanguage(language: ShowLanguagesDTO) {
    this.userAccountService
      .changeLanguage(this.user, language)
      .subscribe((res: any) => {
        this.storage.save('token', res.token);
        this.preferredLanguage = this.findLanguage(
          this.googleLanguages,
          res.language
        );
        this.authService.languagePreferenceSet = res.language;
        this.toastr.success('Language changed successfully!');
      });
  }
  private findLanguage(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  private transformLanguage(
    googleLanguages,
    languages: ShowLanguagesDTO[]
  ): ShowLanguagesDTO[] {
    languages.map(language => {
      const transformed = Object.keys(googleLanguages).find(
        key => googleLanguages[key] === language.language
      );
      language.language = transformed;
      return language;
    });
    return languages;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.uiBlocksSubscription.unsubscribe();
  }
}
