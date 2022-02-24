import { NextFunction, Response } from 'express';
import { ApiController, GET, PATCH, POST } from '../../../core/api-decorators';
import BaseRequest from '../../base/base.request';

@ApiController('/api/users')
class Controller {
  @GET('/me', {
    summary: 'Получение информациии о пользователе',
  })
  async getUser(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @PATCH('/', {
    summary: 'Обновление информации о пользователе',
  })
  async updateUser(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @GET('/me/reviews', {
    summary: 'Получение всех отзывов пользователя',
  })
  async getRating(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }
}

export default new Controller();
