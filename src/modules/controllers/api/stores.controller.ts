import { NextFunction, Response } from 'express';
import { ApiController, GET } from '../../../core/api-decorators';
import BaseRequest from '../../base/base.request';

@ApiController('/api/stores')
class Controller {
  @GET('/', {
    summary: 'Получение списка магазинов',
    query: {
      'category?': 'Название категории',
      'searchValue?': 'название тега',
    }
  })
  async getStores(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @GET('/:id', {
    summary: 'Получение информации о магазине по id',
  })
  async getStoreById(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @GET('/:id/products', {
    summary: 'Получение информации о магазине по id',
    query: {
      'category?': 'Название категории',
      'searchValue?': 'название тега',
    }
  })
  async getStoreProducts(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }
}

export default new Controller();