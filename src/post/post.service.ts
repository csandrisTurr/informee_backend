import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbPostDocument, DbPostName } from 'src/schema/db/Post';
import { DbUserDocument, DbUserName } from 'src/schema/db/User';
import { CreatePostDto, EditPostDto } from 'src/schema/dto/Post';
import { RestResponse } from 'src/schema/dto/RestResponse';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(DbPostName) private readonly postModel: Model<DbPostDocument>,
    @InjectModel(DbUserName) private readonly userModel: Model<DbUserDocument>,
  ) {}

  async getPosts(opts: { idFilter?: string, from?: string, userId: string, content: boolean }): Promise<DbPostDocument[]> {
    const filter = {};
    if (opts.idFilter) filter['_id'] = opts.idFilter;
    if (opts.from) filter['author'] = opts.from;

    const posts = await this.postModel.find(filter, opts.content ? undefined : '-content').populate('author', '-password -email -updateDate -__v -creationDate').exec();

    return posts.filter(post => {
      if (post.author._id.toString() != opts.userId) {
        if (post.private) return false;
      }

      return true;
    });
  }

  async createPost(userId: string): Promise<DbPostDocument> {
    const user = await this.userModel.findOne({ _id: userId });
    const dbPost = new this.postModel({
      author: user,
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
    const dbPost = await this.postModel.findOne({ _id: postId, author: userId });

    if (!dbPost) throw RestResponse.err(404, 'NOT_FOUND');

    for (let key of Object.keys(newData)) {
      dbPost[key] = newData[key];
    }

    await dbPost.save();

    return dbPost;
  }

  async setContent(postId: string, userId: string, newContent: string): Promise<boolean> {
    const dbPost = await this.postModel.findOne({ id: postId, author: userId });

    dbPost.content = newContent;
    await dbPost.save();

    return true;
  }

  async setPrivate(postId: string, userId: string, bool: boolean): Promise<boolean> {
    const dbPost = await this.postModel.findOne({ id: postId, author: userId });

    dbPost.private = bool;
    await dbPost.save();

    return true;
  }

  async deletePost(postId: string, userId: string): Promise<boolean> {
    const dbPost = await this.postModel.deleteOne({ _id: postId, author: userId });

    if (!dbPost) throw RestResponse.err(404, 'NOT_FOUND');

    return true;
  }
}
