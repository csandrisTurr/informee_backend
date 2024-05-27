import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, SchemaTypes } from 'mongoose';
import { DbUser, DbUserDocument, DbUserName, DbUserSchema } from './User';

@Schema({ virtuals: true })
export class DbPost {
  // author of the post
  @Prop({ type: SchemaTypes.ObjectId, required: true, index: true, ref: DbUserName })
  author: DbUserDocument;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  tags: string[];

  @Prop({ required: true })
  private: boolean;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  updateDate: string;

  @Prop({ required: true })
  creationDate: string;
}

export const DbPostSchema = SchemaFactory.createForClass(DbPost);
export type DbPostDocument = HydratedDocument<DbPost>;
export const DbPostName = 'post';
