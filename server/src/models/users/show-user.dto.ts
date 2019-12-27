import { Publish } from '../../common/transformer/decorators/publish';
import { Role } from '../../database/entities/role.entity';
import { IsNotEmpty } from 'class-validator';

export class ShowUserDTO {
  @Publish()
  @IsNotEmpty()
  public id: number;

  @Publish()
  @IsNotEmpty()
  public username: string;

  @Publish()
  @IsNotEmpty()
  public email: string;

  @Publish()
  @IsNotEmpty()
  public firstName: string;

  @Publish()
  @IsNotEmpty()
  public lastName: string;

  @Publish()
  @IsNotEmpty()
  public role: Role;

  @Publish()
  @IsNotEmpty()
  public dateRegistration: Date;

  @Publish()
  @IsNotEmpty()
  public deleted: boolean;
}
