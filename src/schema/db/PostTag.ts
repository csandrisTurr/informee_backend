import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class DbPostTag {
  @Prop({ required: true })
  name: string;
}

export const DbPostTagSchema = SchemaFactory.createForClass(DbPostTag);
export type DbPostTagDocument = HydratedDocument<DbPostTag>;
export const DbPostTagName = 'tag';
