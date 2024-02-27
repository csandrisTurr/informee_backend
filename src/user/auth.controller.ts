import { Body, Controller, NotImplementedException, Post } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from 'src/schema/dto/User';

@Controller('auth')
export class AuthController {
    @Post('login')
    async login(@Body() dto: LoginUserDto) {
        throw new NotImplementedException();
    }

    @Post('register')
    async register(@Body() dto: RegisterUserDto) {
        throw new NotImplementedException();
    }
}
