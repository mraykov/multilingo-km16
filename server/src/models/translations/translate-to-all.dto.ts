import { IsNotEmpty } from 'class-validator';
import { TranslationTypeEnum } from '../../common/enums/translation-type.enum';

export class TranslateToAllLanguagesDTO {
    @IsNotEmpty()
    public text: string;
    @IsNotEmpty()
    public originLanguage: string;
    @IsNotEmpty()
    public type: TranslationTypeEnum;
}
