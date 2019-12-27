import { IsNotEmpty } from 'class-validator';

export class UpdateTranslationDTO {
    @IsNotEmpty()
    public text: string;
    @IsNotEmpty()
    public targetLanguage: string;
}
