import { IsEmail, IsString } from "class-validator";

export class RegisterUserDto {
    @IsEmail()
    email: string;

    @IsString()
    username: string;

    @IsString()
    displayName: string;

    @IsString()
    password: string;
}

export class LoginUserDto {
    @IsEmail()
    email: string;

    // TODO: add check for sha512
    @IsString()
    password: string;
}
