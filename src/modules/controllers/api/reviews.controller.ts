import { NextFunction, Response } from 'express';
import { ApiController, DELETE, PATCH } from '../../../core/api-decorators';
import { requireToken } from '../../../middlewares/require-token';
import { dtoValidator } from '../../../middlewares/validate';
import BaseRequest from '../../base/base.request';
import { RatingUpdateDto } from '../../dto/rating-update.dto';
import ApiReviewsService from '../../services/api/api-reviews.service';

@ApiController('/api/reviews')
class Controller {
  @PATCH('/:id', {
    summary: 'Обновление отзыва',
    handlers: [requireToken, dtoValidator(RatingUpdateDto)],
  })
  async updateRating(req: BaseRequest, res: Response, next: NextFunction) {
    const dto = {...req.body, ratingId: req.params.id}
    const review = await ApiReviewsService.updateReview(dto);
    res.json(review);
  }

  @DELETE('/:id', {
    summary: 'Удаление отзыва',
    handlers: [requireToken],
  })
  async deleteRating(req: BaseRequest, res: Response, next: NextFunction) {
    await ApiReviewsService.deleteReview(req.params.id);
    res.json({ message: 'succesfull' });
  }
}

export default new Controller();
