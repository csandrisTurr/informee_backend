import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbUser, DbUserName } from 'src/schema/db/User';
import { RegisterUserDto } from 'src/schema/dto/User';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(DbUserName) private readonly userModel: Model<DbUser>,
    ) {}

    async login(email: string, password: string): Promise<any> {
        const dbUser = await this.userModel.findOne({ email });

        if (!dbUser || !await argon2.verify(dbUser.password, password)) {
            throw new UnauthorizedException();
        }

        // return jwt user object
        return {
            id: dbUser.id,
            username: dbUser.username,
        }
    }

    async renewJwt(jwt: string) {
        // TODO
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
