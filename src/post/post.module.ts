import { Module } from '@nestjs/common';
import { Post } from './post.service';
import { PostController } from './post.controller';

@Module({
  providers: [Post],
  controllers: [PostController]
})
export class PostModule {}
