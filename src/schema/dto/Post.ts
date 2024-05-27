import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsOptional, IsString, Length, Matches, ValidateNested } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(8, 64)
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
  @IsOptional()
  content: string;
}

export class EditPostDto {
  @IsOptional()
  @IsString()
  @Length(8, 64)
  title: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  tags: string[];

  @IsOptional()
  @IsBoolean()
  private: boolean;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  @Length(1024, 131072) // 2^10, 2^17
  content: string;
}

export class PostSetContentDto {
  @IsString()
  @Length(1024, 131072) // 2^10, 2^17
  @IsOptional()
  content: string;
}
