import Rating from '../../../database/models/final/rating.model';
import { throwError } from '../../../utils/http-exception';
import { RatingUpdateDto } from '../../dto/rating-update.dto';

export default class ApiReviewsService {
  static async getReviewById(reviewId: string) {
    const review = await Rating.findByPk(reviewId);
    return review;
  }

  static async updateReview(dto: RatingUpdateDto) {
    const review = await Rating.findByPk(dto.ratingId);
    if (!review) {
      throwError({
        statusCode: 404,
        message: 'Not found.',
      });
    }
    await review.update(dto);
    return review;
  }

  static async deleteReview(idReview: string) {
    const review = await Rating.findByPk(idReview);
    if (!review) {
      throwError({
        statusCode: 404,
        message: 'Not found.',
      });
    }
    await review.destroy();
    return { message: 'Delete succesfull' };
  }
}
