import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DbReviewName, DbReviewSchema } from 'src/schema/db/Review';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DbReviewName, schema: DbReviewSchema },
    ]),
  ],
  providers: [ReviewService],
  controllers: [ReviewController]
})
export class ReviewModule {}
