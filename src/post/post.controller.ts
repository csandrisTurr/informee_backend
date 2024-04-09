import { Controller, Delete, Get, NotImplementedException, Patch, Post } from '@nestjs/common';

@Controller('post')
export class PostController {
    @Get(':id')
    async getPost() {
        throw new NotImplementedException();
    }

    @Post()
    async createPost() {
        throw new NotImplementedException();
    }

    @Patch(':id')
    async updatePost() {
        throw new NotImplementedException();
    }

    @Delete(':id')
    async deletePost() {
        throw new NotImplementedException();
    }
}
