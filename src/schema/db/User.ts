import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class DbUser {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.Date })
  updateDate: string;

  @Prop({ required: true, type: mongoose.SchemaTypes.Date })
  creationDate: string;

  @Prop()
  learnLevel: string;

  @Prop()
  bio: string;
}

export const DbUserSchema = SchemaFactory.createForClass(DbUser);
export type DbUserDocument = HydratedDocument<DbUser>;
export const DbUserName = 'user';
