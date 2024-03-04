import { Body, Controller, NotImplementedException, Post } from '@nestjs/common';
import { RestResponse } from 'src/schema/dto/RestResponse';
import { LoginUserDto, RegisterUserDto } from 'src/schema/dto/User';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {
    constructor (private readonly userService: UserService) {}

    @Post('login')
    async login(@Body() dto: LoginUserDto): Promise<RestResponse> {
        throw new NotImplementedException();
    }

    @Post('register')
    async register(@Body() dto: RegisterUserDto): Promise<RestResponse> {
        return RestResponse.ok(
            await this.userService.createUser(dto),
            201,
        );
    }
}
