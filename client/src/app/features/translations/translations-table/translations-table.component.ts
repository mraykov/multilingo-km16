import { Component, OnInit, QueryList, ViewChildren, OnDestroy } from '@angular/core';
import { TranslationDTO } from '../models/translation.dto';
import { NotificatorService } from '../../../core/services/notificator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbdSortableHeaderDirective } from '../directive/sort-directive';
import { SortEvent, compare } from '../directive/sort-methods';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin/admin.service';
import { SupportedLanguagesSL } from '../../../common/supported languages/supported-languages-s-l';
import { LanguageDTO } from '../models/languages/language.dto';
import { TranslationsService } from '../translations.service';
import { LanguagesService } from '../../../core/services/languages.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-translations-table',
  templateUrl: './translations-table.component.html',
  styleUrls: ['./translations-table.component.scss']
})
export class TranslationsTableComponent implements OnInit, OnDestroy {
  public originalTranslations: TranslationDTO[];
  public translations: TranslationDTO[];
  public filterText = '';
  public filterTranslation = '';
  public filterType = '';
  public supportedLanguages: LanguageDTO[];
  public currentTranslationsLang = navigator.language;
  public languagesGoogle = SupportedLanguagesSL;

  private languageSubscription: Subscription;
  private uiBlocksSubscription: Subscription;
  public uiBlocks;

  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;

  onSort({ column, direction }: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.appSortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '') {
      this.translations = this.translations;
    } else {
      this.translations = [...this.translations].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly notification: NotificatorService,
    private readonly adminService: AdminService,
    private readonly languagesService: LanguagesService,
    private readonly translationsService: TranslationsService,
    private readonly authService: AuthService,
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        ({ translations }) => {
          this.originalTranslations = translations;
          this.translations = translations;
        },
        err => {
          this.notification.error('Something went wrong!');
        },
      );
    this.uiBlocksSubscription = this.adminService.uiBlocks$.subscribe(
      blocks => {
        if (blocks) {
          this.uiBlocks = blocks;
        }
      }
    );
    this.languageSubscription = this.authService.languagePreference$.subscribe(lang => {
      this.currentTranslationsLang = lang;
      this.translationsService.getAllTranslations(lang);
    });
    this.languagesService.getAllSupportedLanguages()
      .subscribe(
        languages => this.supportedLanguages = languages,
        err => this.notification.error('Something went wrong with languaes!')
      );
  }

  public editTranslation(translation: TranslationDTO) {
    this.router.navigate(['translations', translation.id]);
  }

  public getLanguage(language: string): string {
    return this.languagesGoogle[language];
  }

  public searchTranslations() {
    this.translations = this.originalTranslations.filter(translation =>
      translation.text.toLowerCase().includes(this.filterText.toLowerCase())
      && translation.translation.toLowerCase().includes(this.filterTranslation.toLowerCase())
      && translation.type.toLowerCase().includes(this.filterType.toLowerCase())
    );
  }

  public getTranslationsByLang(language: string) {
    this.translationsService.getAllTranslations(language)
      .subscribe(translations => {
        this.originalTranslations = translations;
        this.translations = translations;
        this.currentTranslationsLang = language;
      });
  }

  public browserLanguage() {
    return this.currentTranslationsLang;
  }

  public ngOnDestroy() {
    this.uiBlocksSubscription.unsubscribe();
    this.languageSubscription.unsubscribe();
  }

}
