import { Publish } from '../../common/transformer/decorators/publish';
import { RoleTypes } from '../../common/enums/role.enum';

export class RolesUserDTO {

  @Publish()
  public roleName: RoleTypes;

}
