import { Role } from './user-role.dto';

export class ShowUserDTO {
  public id: number;
  public username: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public role: Role;
  public isBanned: boolean;
  public dateRegistration: Date | string;
  public deleted: boolean;
}
