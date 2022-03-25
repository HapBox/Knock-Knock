import { NextFunction, Response } from 'express';
import { ApiController, GET } from '../../../core/api-decorators';
import { dropDB } from '../../../database';
import { requireToken } from '../../../middlewares/require-token';
import BaseRequest from '../../base/base.request';

@ApiController('/sa/api/db')
class Controller {
  @GET('/wipe', {
    summary: 'Метод для вайпа БД(Сброс таблиц)',
    handlers: [requireToken],
  })
  async wipe(req: BaseRequest, res: Response, next: NextFunction) {
    await dropDB();
    res.json({
      message: 'DataBase wiped',
    });
  }
}

export default new Controller();
