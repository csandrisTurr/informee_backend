import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @Length(0, 64)
  email: string;

  @IsString()
  @Length(3, 24)
  username: string;

  @IsString()
  @Length(3, 24)
  displayName: string;

  // TODO: add check for sha512
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
