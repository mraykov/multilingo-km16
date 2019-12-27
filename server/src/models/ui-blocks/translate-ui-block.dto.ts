import { IsNotEmpty } from 'class-validator';

export class TranslateUiBlockDTO {
    @IsNotEmpty()
    public text: string;
    @IsNotEmpty()
    public language: string;
}
