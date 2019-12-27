import { createParamDecorator } from '@nestjs/common';

export const UserReq = createParamDecorator((_, req) => req.user);
