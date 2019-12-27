import { IsNotEmpty } from 'class-validator';
import { TranslateToAllLanguagesDTO } from './translate-to-all.dto';

export class TranslateDTO extends TranslateToAllLanguagesDTO {
  @IsNotEmpty()
  public targetLanguage: string;
}
