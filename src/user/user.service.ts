import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbUser, DbUserName } from 'src/schema/db/User';
import { JwtPayload, RegisterUserDto } from 'src/schema/dto/User';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(DbUserName) private readonly userModel: Model<DbUser>,
    private readonly jwtService: JwtService,
  ) {}

  // @returns the jwt token for the user
  async login(email: string, password: string): Promise<string> {
    const dbUser = await this.userModel.findOne({ email });

    if (!dbUser || !(await argon2.verify(dbUser.password, password))) {
      throw new UnauthorizedException();
    }

    const jwtPayload: JwtPayload = {
      id: dbUser.id,
      username: dbUser.username,
    };

    // return jwt user object
    return await this.jwtService.signAsync(jwtPayload);
  }

  // @returns the renewed jwt
  async renewJwt(userId: string, password: string): Promise<string> {
    // no error handling because guard already validated jwt
    const dbUser = await this.userModel.findOne({ _id: userId });

    if (!dbUser || !(await argon2.verify(dbUser.password, password))) {
      throw new UnauthorizedException();
    }

    const newJwtPayload = {
      id: dbUser.id,
      username: dbUser.username,
    };

    return await this.jwtService.signAsync(newJwtPayload);
  }

  async createUser(data: RegisterUserDto) {
    const dbUser = new this.userModel({
      username: data.username,
      displayName: data.displayName,
      creationDate: new Date(),
      updateDate: new Date(),
      email: data.email,
      password: await argon2.hash(data.password),
    });

    await dbUser.save();
  }
}
