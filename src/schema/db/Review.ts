import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { DbUserDocument, DbUserName } from './User';
import { DbPostDocument, DbPostName } from './Post';

@Schema({ timestamps: true })
export class DbReview {
  // author of the post
  @Prop({ type: SchemaTypes.ObjectId, required: true, index: true, ref: DbUserName })
  author: DbUserDocument;

  @Prop({ type: SchemaTypes.ObjectId, required: true, index: true, ref: DbPostName })
  post: DbPostDocument;

  @Prop({ required: true })
  content: string;

  // -1 = negative
  // 0 = neutral
  // 1 = positive
  @Prop({ required: true })
  value: number;
}

export const DbReviewSchema = SchemaFactory.createForClass(DbReview);
export type DbReviewDocument = HydratedDocument<DbReview>;
export const DbReviewName = 'review';
