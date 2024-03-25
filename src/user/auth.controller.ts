import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RestResponse } from 'src/schema/dto/RestResponse';
import { JwtPayload, LoginUserDto, RegisterUserDto, RenewTokenDto } from 'src/schema/dto/User';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';
import { User } from './user.decorator';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('login')
  async login(@Body() dto: LoginUserDto): Promise<RestResponse> {
    return RestResponse.ok(
      {
        token: await this.userService.login(dto.email, dto.password),
      },
      200,
    );
  }

  @Post('renewToken')
  async renewToken(@Body() dto: RenewTokenDto, @User() user: JwtPayload): Promise<RestResponse> {
    return RestResponse.ok(
      {
        token: await this.userService.renewJwt(user.id, dto.password),
      },
      200,
    );
  }

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterUserDto): Promise<RestResponse> {
    return RestResponse.ok(await this.userService.createUser(dto), 201);
  }
}
