import { RoleTypes } from '../../common/enums/role.enum';

export class TokenUserDTO {

  public id: number;

  public username: string;

  public role: RoleTypes;

  public preferredLanguage: string;
}
