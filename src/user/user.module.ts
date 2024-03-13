import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DbUserName, DbUserSchema } from 'src/schema/db/User';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DbUserName, schema: DbUserSchema }]),
    JwtModule.register({
      global: true,
      secret: 'asdasadsadssaddsa',
      signOptions: {
        expiresIn: '1d',
      }
    })
  ],
  providers: [UserService],
  controllers: [UserController, AuthController],
})
export class UserModule {}
