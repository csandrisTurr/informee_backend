import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsIn, IsOptional, IsString, Length, Matches, ValidateNested } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @Length(8, 256)
  content: string;

  @IsIn([-1, 0, 1])
  value: boolean;
}

export class EditReviewDto {
  @IsOptional()
  @IsString()
  @Length(8, 256)
  content: string;

  @IsOptional()
  @IsIn([-1, 0, 1])
  value: boolean;
}
