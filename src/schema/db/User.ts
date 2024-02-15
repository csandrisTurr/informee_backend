import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class DbUser {
  @Prop({ required: true })
  id: string;
  
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  updateDate: string;

  @Prop({ required: true })
  creationDate: string;

  @Prop()
  learnLevel: string;

  @Prop()
  bio: string;
}

export const DbUserSchema = SchemaFactory.createForClass(DbUser);
export type DbUserDocument = HydratedDocument<DbUser>;
export const DbUserName = 'user';
