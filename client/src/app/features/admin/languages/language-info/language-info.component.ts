import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ShowLanguagesDTO } from '../models/show-languages.dto';

@Component({
  selector: 'app-language-info',
  templateUrl: './language-info.component.html',
  styleUrls: ['./language-info.component.scss']
})
export class LanguageInfoComponent {
  @Input() public language: ShowLanguagesDTO;
  @Input() public uiBlocks;

  @Output() public changeLangStatus = new EventEmitter<ShowLanguagesDTO>();
  @Output() public deleteLanguage = new EventEmitter<ShowLanguagesDTO>();

  public changeStatus() {
    this.changeLangStatus.emit(this.language);
  }

  public delete() {
    this.deleteLanguage.emit(this.language);
  }
}
