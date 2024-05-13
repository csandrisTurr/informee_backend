import { Controller, NotImplementedException, Post } from '@nestjs/common';

@Controller('review')
export class ReviewController {
  @Post()
  async createReview() {
    throw new NotImplementedException();
  }

  @Post(':id')
  async editReview() {
    throw new NotImplementedException();
  }
  
  @Post(':id')
  async deleteReview() {
    throw new NotImplementedException();
  }
}
