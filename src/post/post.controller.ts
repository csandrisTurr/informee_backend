import { Body, Controller, Delete, Get, NotImplementedException, Param, Patch, Post, Query } from '@nestjs/common';
import { CreatePostDto, EditPostDto, PostSetContentDto } from 'src/schema/dto/Post';
import { RestResponse } from 'src/schema/dto/RestResponse';
import { JwtPayload } from 'src/schema/dto/User';
import { User } from 'src/user/user.decorator';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id?')
  async getPosts(@Param('id') postId: string, @User() user: JwtPayload, @Query('from') from: string) {
    return RestResponse.ok(await this.postService.getPosts({ idFilter: postId, from, userId: user.id }), 200);
  }

  @Post()
  async createPost(@User() user: JwtPayload) {
    return RestResponse.ok(await this.postService.createPost(user.id), 200);
  }

  @Patch(':id')
  async editPost(@Body() data: EditPostDto, @Param('id') postId: string, @User() user: JwtPayload) {
    return RestResponse.ok(await this.postService.editPost(postId, data, user.id), 200);
  }

  @Patch(':id/set_content')
  async setContent(@Body() data: PostSetContentDto, @Param('id') postId: string, @User() user: JwtPayload) {
    return RestResponse.ok(await this.postService.setContent(postId, user.id, data.content), 200);
  }

  @Patch(':id/set_private/:bool')
  async setPrivate(
    @Body() data: PostSetContentDto,
    @Param('id') postId: string,
    @Param('bool') bool: string,
    @User() user: JwtPayload,
  ) {
    return RestResponse.ok(await this.postService.setPrivate(postId, user.id, bool == '1' ? true : false), 200);
  }

  @Patch(':id')
  async updatePost() {
    throw new NotImplementedException();
  }

  @Delete(':id')
  async deletePost(@Param('id') postId: string, @User() user: JwtPayload) {
    return RestResponse.ok(await this.postService.deletePost(postId, user.id), 200);
  }
}
