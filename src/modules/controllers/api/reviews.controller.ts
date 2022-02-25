import { NextFunction, Response } from 'express';
import { ApiController, DELETE, GET, PATCH, POST } from '../../../core/api-decorators';
import BaseRequest from '../../base/base.request';

@ApiController('/api/reviews')
class Controller {
  @PATCH('/:id', {
    summary: 'Обновление отзыва',
  })
  async updateRating(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @DELETE('/:id', {
    summary: 'Удаление отзыва',
  })
  async deleteRating(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }
}

export default new Controller();
