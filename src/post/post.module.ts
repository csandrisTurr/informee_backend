import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DbPostName, DbPostSchema } from 'src/schema/db/Post';

@Module({
  imports: [MongooseModule.forFeature([{ name: DbPostName, schema: DbPostSchema }])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
