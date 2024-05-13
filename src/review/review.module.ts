import { Module } from '@nestjs/common';
import { Review } from './review';
import { ReviewController } from './review.controller';

@Module({
  providers: [Review],
  controllers: [ReviewController]
})
export class ReviewModule {}
