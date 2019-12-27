import { IsNotEmpty } from 'class-validator';

export class UpdateLanguageDTO {
  @IsNotEmpty()
  public isActive: boolean;
}
