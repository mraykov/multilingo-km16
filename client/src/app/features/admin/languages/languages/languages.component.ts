import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShowLanguagesDTO } from '../models/show-languages.dto';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AdminService } from '../../admin.service';
import { NotificatorService } from '../../../../core/services/notificator.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit, OnDestroy {
  public languages: ShowLanguagesDTO[];
  public filtered: ShowLanguagesDTO[];

  public uiBlockSubscription: Subscription;
  public uiBlocks;
  public googleLanguages;
  public addLanguageForm: FormGroup;
  public searchGoogleLanguages: string[];
  public model: any;

  constructor(
    private readonly router: ActivatedRoute,
    private readonly adminService: AdminService,
    private readonly toastr: NotificatorService,
    private readonly fb: FormBuilder,
    private readonly config: NgbTypeaheadConfig
  ) {
    config.showHint = true;
  }

  ngOnInit() {
    this.router.data.subscribe(({ googleLanguages }) => {
      this.googleLanguages = googleLanguages;
      this.searchGoogleLanguages = Object.keys(googleLanguages);
    });
    this.router.data.subscribe(({ languages }) => {
      this.languages = this.transformLanguage(languages);
      this.filtered = languages;
      this.filtered.sort((a, b) => {
        return a.id - b.id;
      });
    });
    this.uiBlockSubscription = this.adminService.uiBlocks$.subscribe(
      uiBlocks => {
        this.uiBlocks = uiBlocks;
      }
    );

    this.addLanguageForm = this.fb.group({
      language: ['', Validators.compose([Validators.required])]
    });
  }

  public searchLanguage(content: string) {
    if (!content) {
      this.filtered = this.languages;
    } else {
      this.filtered = this.languages.filter(language =>
        language.language.toLowerCase().includes(content.toLowerCase())
      );
    }
  }


  searchSupportedLanguage = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? []
      : this.searchGoogleLanguages.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

  public changeStatus(language: ShowLanguagesDTO) {
    this.adminService.changeStatus(language).subscribe(
      (res: ShowLanguagesDTO) => {
        const idx = this.languages.indexOf(language);
        const [transformed] = this.transformLanguage([res]);
        this.languages.splice(idx, 1, transformed);
        this.toastr.success('Status changed successfully');
      },
      error => {
        this.toastr.error(error.error.error);
      }
    );
  }

  public deleteLanguage(language: ShowLanguagesDTO) {
    this.adminService.deleteLanguage(language).subscribe(
      res => {
        const idx = this.languages.indexOf(language);
        this.languages.splice(idx, 1);
        this.toastr.success(`Language deleted successfully!`);
      },
      error => {
        this.toastr.error(error.error.error);
      }
    );
  }

  public addLanguage() {
    this.adminService.addLanguage(this.addLanguageForm.value).subscribe(
      (res: ShowLanguagesDTO) => {
        const [transformed] = this.transformLanguage([res]);
        this.languages.push(transformed);
        this.filtered = this.languages;
        this.toastr.success(`${res.language} was added successfully!`);
      },
      error => {
        this.toastr.error(error.error.error);
      },
      () => {
        this.addLanguageForm.reset();
      }
    );
  }

  private transformLanguage(languages: ShowLanguagesDTO[]): ShowLanguagesDTO[] {
    const googleLanguages = this.googleLanguages;
    languages.map(language => {
      const transformed = Object.keys(googleLanguages).find(
        key => googleLanguages[key] === language.language
      );
      language.language = transformed;
      return language;
    });
    return languages;
  }

  public ngOnDestroy() {
    this.uiBlockSubscription.unsubscribe();
  }
}
