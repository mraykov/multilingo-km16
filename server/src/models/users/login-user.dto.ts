import { Length, Matches, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginUserDTO {

  @ApiModelProperty({ example: 'Stoyan' })
  @IsOptional()
  @Length(2, 20)
  public username: string;

  @ApiModelProperty({ example: 'wel1234' })
  // Matches passwords with minimum five characters, at least one letter and one number
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/, {
    message:
      'The password must be minimum five characters, at least one letter and one number',
  })
  public password: string;

}
