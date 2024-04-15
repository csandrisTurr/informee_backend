import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DbPostDocument } from 'src/schema/db/Post';
import { CreatePostDto } from 'src/schema/dto/Post';
import { RestResponse } from 'src/schema/dto/RestResponse';

@Injectable()
export class PostService {
    constructor (private readonly postModel: Model<DbPostDocument>) {}

    async getPosts(userId: string, idFilter?: string): Promise<DbPostDocument[]> {
        return await this.postModel.find({ authorId: userId, id: idFilter });
    }

    async createPost(data: CreatePostDto, userId: string): Promise<DbPostDocument> {
        const dbPost = new this.postModel({
            authorId: userId,
            title: data.title,
            tags: [],
            private: data.private,
            description: data.description,
            updateDate: new Date(),
            creationDate: new Date(),
        });

        await dbPost.save();

        return dbPost;
    }

    async deletePost(postId: string, userId: string): Promise<boolean> {
        const dbPost = await this.postModel.findOne({ id: postId, authorId: userId })

        if (!dbPost)
            throw RestResponse.err(
                404,
                'NOT_FOUND',
            );

        return true;
    }
}
