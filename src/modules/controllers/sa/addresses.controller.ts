import { NextFunction, Response } from 'express';
import { ApiController, DELETE, GET, PATCH, POST } from '../../../core/api-decorators';
import BaseRequest from '../../base/base.request';

@ApiController('/sa/api/addresses')
class Controller {
  @GET('/', {
    summary: 'Получение списка адресов',
  })
  async getAddress(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @GET('/:id', {
    summary: 'Получение адреса по id',
  })
  async getAddresById(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @POST('/', {
    summary: 'Создание адреса для магазина',
  })
  async createAddress(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @PATCH('/:id', {
    summary: 'Обновление информации адреса для магазина',
  })
  async patchAddress(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @DELETE('/', { //скорее всего не нужно :)
    summary: 'Удаление адреса магазина',
  })
  async deleteAddress(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }
}

export default new Controller();
