import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DbReview, DbReviewDocument, DbReviewName } from 'src/schema/db/Review';
import { RestResponse } from 'src/schema/dto/RestResponse';
import { CreateReviewDto, EditReviewDto } from 'src/schema/dto/Review';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(DbReviewName) private readonly reviewModel: Model<DbReviewDocument>,
  ) {}

  async getReviewsForPost(postId: string): Promise<DbReviewDocument[]> {
    return await this.reviewModel.find({ post: postId }).populate('author', '-password -email -updateDate -__v -creationDate').exec();
  }

  async getLikesForPost(postId: string): Promise<{ likes: number; dislikes: number }> {
    let likes = 0;
    let dislikes = 0;

    (await this.reviewModel.find({ post: postId })).forEach(x => {
      if (x.value > 0) likes++;
      else dislikes++;
    });

    return { likes, dislikes };
  }

  async createReview(data: CreateReviewDto, postId: string, userId: string): Promise<DbReviewDocument> {
    const dbReview = new this.reviewModel({
      post: new Types.ObjectId(postId),
      author: new Types.ObjectId(userId),
      content: data.content,
      value: data.value,
    });

    await dbReview.save();

    return dbReview;
  }

  async editReview(newData: EditReviewDto, reviewId: string, userId: string): Promise<DbReviewDocument> {
    const dbReview = await this.reviewModel.findOne({ _id: reviewId, user: userId });
    
    if (!dbReview) throw RestResponse.err(404, 'NOT_FOUND');

    for (let key of Object.keys(newData)) {
      dbReview[key] = newData[key];
    }

    await dbReview.save();

    return dbReview;
  }

  async deleteReview(reviewId: string, userId: string): Promise<boolean> {
    const dbReview = await this.reviewModel.deleteOne({ _id: reviewId, author: userId });

    if (!dbReview) throw RestResponse.err(404, 'NOT_FOUND');

    return true;
  }
}
