import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class DbReview {
  // author of the post
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  postId: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  updateDate: string;

  @Prop({ required: true })
  creationDate: string;

  // -1 = negative
  // 0 = neutral
  // 1 = positive
  @Prop({ required: true })
  value: number;
}

export const DbReviewSchema = SchemaFactory.createForClass(DbReview);
export type DbReviewDocument = HydratedDocument<DbReview>;
export const DbReviewName = 'review';
