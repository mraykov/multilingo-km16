import { IsNotEmpty } from 'class-validator';

export class ChangeLanguagesDTO {
    @IsNotEmpty()
    public id: number;
    @IsNotEmpty()
    public language: string;
    @IsNotEmpty()
    public isActive: boolean;
    @IsNotEmpty()
    public isDeleted: boolean;
}
