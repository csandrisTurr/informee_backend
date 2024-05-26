import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbPostDocument, DbPostName } from 'src/schema/db/Post';
import { CreatePostDto, EditPostDto } from 'src/schema/dto/Post';
import { RestResponse } from 'src/schema/dto/RestResponse';

@Injectable()
export class PostService {
  constructor(@InjectModel(DbPostName) private readonly postModel: Model<DbPostDocument>) {}

  async getPosts(opts: { idFilter?: string, from?: string, userId: string }): Promise<DbPostDocument[]> {
    const filter = {};
    if (opts.idFilter) filter['_id'] = opts.idFilter;
    if (opts.from) filter['authorId'] = opts.from;

    const posts = await this.postModel.find(filter);

    return posts.filter(post => {
      if (post.authorId != opts.userId) {
        if (post.private) return false;
      }

      return true;
    });
  }

  async createPost(userId: string): Promise<DbPostDocument> {
    const dbPost = new this.postModel({
      authorId: userId,
      title: 'Poszt',
      tags: [],
      private: true,
      description: '...',
      content: '...',
      updateDate: new Date(),
      creationDate: new Date(),
    });

    await dbPost.save();

    return dbPost;
  }

  async editPost(postId: string, newData: EditPostDto, userId: string): Promise<DbPostDocument> {
    const dbPost = await this.postModel.findOne({ _id: postId, authorId: userId });

    if (!dbPost) throw RestResponse.err(404, 'NOT_FOUND');

    for (let key of Object.keys(newData)) {
      dbPost[key] = newData[key];
    }

    await dbPost.save();

    return dbPost;
  }

  async setContent(postId: string, userId: string, newContent: string): Promise<boolean> {
    const dbPost = await this.postModel.findOne({ id: postId, authorId: userId });

    if (dbPost.authorId != userId) throw RestResponse.err(400, 'NO');

    dbPost.content = newContent;
    await dbPost.save();

    return true;
  }

  async setPrivate(postId: string, userId: string, bool: boolean): Promise<boolean> {
    const dbPost = await this.postModel.findOne({ id: postId, authorId: userId });

    if (dbPost.authorId != userId) throw RestResponse.err(400, 'NO');

    dbPost.private = bool;
    await dbPost.save();

    return true;
  }

  async deletePost(postId: string, userId: string): Promise<boolean> {
    const dbPost = await this.postModel.findOne({ id: postId, authorId: userId });

    if (!dbPost) throw RestResponse.err(404, 'NOT_FOUND');

    return true;
  }
}
