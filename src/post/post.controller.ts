import { Body, Controller, Delete, Get, NotImplementedException, Param, Patch, Post } from '@nestjs/common';
import { CreatePostDto, PostSetContentDto } from 'src/schema/dto/Post';
import { RestResponse } from 'src/schema/dto/RestResponse';
import { JwtPayload } from 'src/schema/dto/User';
import { User } from 'src/user/user.decorator';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor (private readonly postService: PostService) {}

    @Get(':id?')
    async getPost(@Param('id') postId: string, @User() user: JwtPayload) {
        return RestResponse.ok(
            await this.postService.getPosts(user.id, postId),
            200,
        );
    }

    @Post()
    async createPost(@Body() data: CreatePostDto, @User() user: JwtPayload) {
        return RestResponse.ok(
            await this.postService.createPost(data, user.id),
            200,
        );
    }
    
    @Patch(':id/set_content')
    async setContent(@Body() data: PostSetContentDto, @Param('id') postId: string, @User() user: JwtPayload) {
        return RestResponse.ok(
            await this.postService.setContent(postId, user.id, data.content),
            200,
        );
    }

    @Patch(':id/set_private/:bool')
    async setContent(@Body() data: PostSetContentDto, @Param('id') postId: string, @Param('bool') bool: string, @User() user: JwtPayload) {
        return RestResponse.ok(
            await this.postService.setPrivate(postId, user.id, bool == '1' ? true : false),
            200,
        );
    }

    @Patch(':id')
    async updatePost() {
        throw new NotImplementedException();
    }

    @Delete(':id')
    async deletePost(@Param('id') postId: string, @User() user: JwtPayload) {
        return RestResponse.ok(
            await this.postService.deletePost(postId, user.id),
            200,
        );
    }
}
