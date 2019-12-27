import { IsNotEmpty } from 'class-validator';

export class AddLanguageDTO {
    @IsNotEmpty()
    public language: string;
}
