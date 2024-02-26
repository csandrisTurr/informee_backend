import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class DbPost {
  @Prop({ required: true })
  id: string;

  // author of the post
  @Prop({ required: true })
  parent: string;

  @Prop({ required: true })
  title: string;

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
