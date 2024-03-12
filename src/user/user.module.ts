import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DbUserName, DbUserSchema } from 'src/schema/db/User';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DbUserName, schema: DbUserSchema }])
  ],
  providers: [UserService],
  controllers: [UserController, AuthController],
})
export class UserModule {}
