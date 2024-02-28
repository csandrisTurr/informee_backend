import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbUser, DbUserName } from 'src/schema/db/User';
import { RegisterUserDto } from 'src/schema/dto/User';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(DbUserName) private readonly userModel: Model<DbUser>,
    ) {}

    async createUser(data: RegisterUserDto) {
        const dbUser = new this.userModel({
            username: data.username,
            displayName: data.displayName,
            creationDate: new Date(),
            updateDate: new Date(),
            email: data.email,
            password: data.password,
        });

        await dbUser.save();
    }
}
