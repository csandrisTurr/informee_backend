import { Body, Controller, NotImplementedException, Post } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from 'src/schema/dto/User';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {
    constructor (private readonly userService: UserService) {}

    @Post('login')
    async login(@Body() dto: LoginUserDto) {
        throw new NotImplementedException();
    }

    @Post('register')
    async register(@Body() dto: RegisterUserDto) {
        await this.userService.createUser(dto);
    }
}
