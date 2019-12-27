import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticlesService } from '../articles.service';
import { NotificatorService } from '../../../core/services/notificator.service';
import { AdminService } from '../../admin/admin.service';
import { Subscription } from 'rxjs';
import { LanguagesService } from '../../../core/services/languages.service';
import { LanguageDTO } from '../../translations/models/languages/language.dto';
import { SupportedLanguagesSL } from '../../../common/supported languages/supported-languages-s-l';
import { AuthService } from '../../../core/services/auth.service';
import { CreateArticleDTO } from '../models/create-article.dto';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.scss']
})
export class ArticleCreateComponent implements OnInit, OnDestroy {
  public articleForm: FormGroup;

  private uiBlocksSubscription: Subscription;
  public uiBlocks;

  public supportedLanguages: LanguageDTO[];
  public currentLanguage = navigator.language;
  public detectedLanguage: string;
  public detectedLanguageMSG: string;
  public languagesGoogle = SupportedLanguagesSL;

  constructor(
    private readonly fb: FormBuilder,
    private readonly articlesService: ArticlesService,
    private readonly notification: NotificatorService,
    private readonly languagesService: LanguagesService,
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
  ) { }

  public ngOnInit() {
    this.articleForm = this.fb.group({
      title: ['',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ],
      content: ['',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
    });
    this.uiBlocksSubscription = this.adminService.uiBlocks$.subscribe(blocks => {
      if (blocks) {
        this.uiBlocks = blocks;
      }
    });
    this.authService.languagePreference$.subscribe(
      language => this.currentLanguage = language,
      err => this.notification.error('Something went wrong with languaes!')
    );
    this.languagesService.getAllSupportedLanguages()
      .subscribe(
        languages => this.supportedLanguages = languages,
        err => this.notification.error('Something went wrong with languaes!')
      );
  }

  public createArticle() {
    const updatedArticle: CreateArticleDTO = {
      ...(this.articleForm.value),
      language: this.currentLanguage,
    };
    if (updatedArticle.content.length >= 6) {
      if (updatedArticle.title.length <= 2) {
        this.notification.warn('You should write the title with at least two characters!');
      } else {
        this.articlesService.createArticle(updatedArticle)
          .subscribe(
            data => {
              this.articleForm.setValue({
                title: '',
                content: '',
              });
              this.notification.success(`Article was create successfully!`);
            },
            err => this.notification.error('Something went wrong!'),
          );
      }
    } else {
      this.notification.warn('You should write the content with at least six characters!');
    }

  }

  public getLanguage(language: string): string {
    return this.languagesGoogle[language] ? this.languagesGoogle[language] : 'None';
  }

  public setCurrentLang(language: string): void {
    this.currentLanguage = language;
  }

  public detectLanguage() {
    const text = this.articleForm.value.content;
    if (text) {
      this.languagesService.detectLanguage({ text })
        .subscribe(detected => {
          const foundSupportedLang = this.supportedLanguages.find(lang => lang.language === detected.language);
          if (foundSupportedLang) {
            this.setCurrentLang(detected.language);
            this.detectedLanguage = detected.language;
          } else {
            this.detectedLanguageMSG = `Detected: ${this.getLanguage(detected.language)}, Not supported language!`;
          }
        });
    } else {
      this.detectedLanguageMSG = 'Your should provide some content!';
    }
  }

  public detectedLangButton() {
    if (this.detectedLanguageMSG) {
      return this.detectedLanguageMSG;
    } else if (this.detectedLanguage) {
      return `Detected ${this.getLanguage(this.detectedLanguage)}`;
    }
    return '';
  }

  public clearDetectedLanguages() {
    this.detectedLanguageMSG = '';
    this.detectedLanguage = '';
  }

  public ngOnDestroy() {
    this.uiBlocksSubscription.unsubscribe();
  }

}
