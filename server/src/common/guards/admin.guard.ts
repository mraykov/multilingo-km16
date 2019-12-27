import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RoleTypes } from '../enums/role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return user && user.roles.includes(RoleTypes.Admin);
  }
}
