import { Body, Controller, Get, NotImplementedException, Param, Post } from '@nestjs/common';
import { RestResponse } from 'src/schema/dto/RestResponse';
import { JwtPayload } from 'src/schema/dto/User';
import { User } from 'src/user/user.decorator';
import { ReviewService } from './review.service';
import { CreateReviewDto, EditReviewDto } from 'src/schema/dto/Review';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
  ) {}

  @Get('post/:postId')
  async getReviewsForPost(@Param('postId') postId: string, @User() user: JwtPayload) {
    return RestResponse.ok(await this.reviewService.getReviewsForPost(postId), 200);
  }

  @Get('likes/:postId')
  async getLikesForPost(@Param('postId') postId: string, @User() user: JwtPayload) {
    return RestResponse.ok(await this.reviewService.getLikesForPost(postId), 200);
  }

  @Post('post/:postId')
  async createReview(@Body() data: CreateReviewDto, @Param('postId') postId: string, @User() user: JwtPayload) {
    return RestResponse.ok(await this.reviewService.createReview(data, postId, user.id), 201);
  }

  @Post(':id')
  async editReview(@Body() data: EditReviewDto, @Param('id') reviewId: string, @User() user: JwtPayload) {
    return RestResponse.ok(await this.reviewService.editReview(data, reviewId, user.id), 200);
  }
  
  @Post(':id')
  async deleteReview(@Param('id') reviewId: string, @User() user: JwtPayload) {
    return RestResponse.ok(await this.reviewService.deleteReview(reviewId, user.id), 200);
  }
}
