import { Controller, Get, Param } from '@nestjs/common';
import { RestResponse } from 'src/schema/dto/RestResponse';
import { UserService } from './user.service';
import { User } from './user.decorator';
import { JwtPayload } from 'src/schema/dto/User';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string, @User() user: JwtPayload): Promise<RestResponse> {
    let targetId = id;
    if (id == '@me') {
      targetId = user.id;
    }

    return RestResponse.ok<unknown>(await this.userService.getPublic(targetId), 200);
  }
}
