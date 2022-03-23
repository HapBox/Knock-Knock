import Rating from '../../../database/models/final/rating.model';
import { throwError } from '../../../utils/http-exception';
import { RatingUpdateDto } from '../../dto/rating-update.dto';

export default class ApiReviewsService {
  static async updateReview(dto: RatingUpdateDto) {
    const review = await Rating.findByPk(dto.ratingId);
    if (!review) {
      throwError({
        statusCode: 404,
        message: 'Not found.',
      });
    }
    return await review.update(dto);
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
  }
}
