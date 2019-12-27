import { IsNotEmpty } from 'class-validator';

export class AddUiBlockDTO {
  @IsNotEmpty()
  public key: string;
  @IsNotEmpty()
  public content: string;
}
