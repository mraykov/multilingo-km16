import { Length, Matches } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class RegisterUserDTO {

  @ApiModelProperty({ example: 'Stoyan' })
  @Length(2, 20)
  public username: string;

  @ApiModelProperty({ example: 'stoyan@admin.com' })
  @Length(2, 30)
  public email: string;

  @ApiModelProperty({ example: 'Stoyan' })
  @Length(2, 30)
  public firstName: string;

  @ApiModelProperty({ example: 'Doll' })
  @Length(2, 30)
  public lastName: string;

  @ApiModelProperty({ example: 'wel1234' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'The password must be minimum five characters, at least one letter and one number',
  })
  public password: string;

}
