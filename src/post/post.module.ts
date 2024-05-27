import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DbPostName, DbPostSchema } from 'src/schema/db/Post';
import { DbUserName, DbUserSchema } from 'src/schema/db/User';

@Module({
  imports: [MongooseModule.forFeature([
    { name: DbPostName, schema: DbPostSchema },
    { name: DbUserName, schema: DbUserSchema },
  ])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
