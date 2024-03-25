import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/schema/dto/User';

export const User = createParamDecorator((_data: unknown, ctx: ExecutionContext): JwtPayload => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
