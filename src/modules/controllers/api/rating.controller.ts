import { NextFunction, Response } from 'express';
import { ApiController, DELETE, GET, PATCH, POST } from '../../../core/api-decorators';
import BaseRequest from '../../base/base.request';

@ApiController('/api/ratings')
class Controller {
  @GET('/', {
    summary: 'Получение всех отзывов',
    query: {
      'userId?': 'ID пользователя',
      'storeId?': 'ID магазина',
    },
  })
  async getRating(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @GET('/:id', {
    summary: 'Получение отзыва',
  })
  async getAllRatings(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @POST('/', {
    summary: 'Создание отзыва',
  })
  async createRating(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

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
