import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DbUserName, DbUserSchema } from 'src/schema/db/User';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DbUserName, schema: DbUserSchema }]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          global: true,
          signOptions: {
            expiresIn: '1d',
          },
          secret: configService.get<string>('JWT_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [UserController, AuthController],
  exports: [JwtModule],
})
export class UserModule {}
