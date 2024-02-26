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