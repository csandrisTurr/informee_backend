import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @Length(0, 64)
  email: string;

  @IsString()
  @Matches(/^[a-z0-9_-]{3,24}$/)
  username: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9 ]{3,24}$/)
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

export class RenewTokenDto {
  // TODO: add check for sha512
  @IsString()
  password: string;
}

export interface JwtPayload {
  id: string;
  username: string;
}
