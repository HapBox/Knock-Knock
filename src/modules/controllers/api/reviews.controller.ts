import { NextFunction, Response } from 'express';
import { ApiController, DELETE, GET, PATCH } from '../../../core/api-decorators';
import { requireToken } from '../../../middlewares/require-token';
import { dtoValidator } from '../../../middlewares/validate';
import APIRatingModels from '../../../swagger/swagger-models/api/ratings';
import SwaggerUtils from '../../../swagger/swagger-utils';
import BaseRequest from '../../base/base.request';
import { RatingUpdateDto } from '../../dto/rating-update.dto';
import ApiReviewsService from '../../services/api/api-reviews.service';

@ApiController('/api/reviews')
class Controller {
  @GET('/:id', {
    summary: 'Получение отзыва по ID',
    responses: [SwaggerUtils.body200(APIRatingModels.resRatingInfo)],
  })
  async getReviewById(req: BaseRequest, res: Response, next: NextFunction) {
    let reviewId = req.params.id;
    const result = await ApiReviewsService.getReviewById(reviewId);
    res.json(result);
  }

  @PATCH('/:id', {
    summary: 'Обновление отзыва',
    handlers: [requireToken, dtoValidator(RatingUpdateDto)],
    body: APIRatingModels.reqRatingCreate,
    responses: [SwaggerUtils.body200(APIRatingModels.resRatingInfo)],
  })
  async updateRating(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: RatingUpdateDto = {
      ...req.body,
      ratingId: req.params.id,
    };
    const result = await ApiReviewsService.updateReview(dto);
    res.json(result);
  }

  @DELETE('/:id', {
    summary: 'Удаление отзыва',
    handlers: [requireToken],
  })
  async deleteRating(req: BaseRequest, res: Response, next: NextFunction) {
    const result = await ApiReviewsService.deleteReview(req.params.id);
    res.json(result);
  }
}

export default new Controller();
