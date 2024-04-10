import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsString, Length, Matches, ValidateNested } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(8, 32)
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  tags: string[];

  @IsBoolean()
  private: boolean;

  @IsString()
  description: string;

  @IsString()
  @Length(1024, 131072) // 2^10, 2^17
  content: string;
}
