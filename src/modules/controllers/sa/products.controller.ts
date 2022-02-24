import { NextFunction, Response } from 'express';
import { ApiController, DELETE, GET, PATCH, POST } from '../../../core/api-decorators';
import BaseRequest from '../../base/base.request';

@ApiController('/api/products')
class Controller {
  @GET('/', {
    summary: 'Получение всех продуктов',
    query: {
      'category?': 'Название категории',
      'searchValue?': 'Название тега поиска',
      'filialId?': 'ID филиала',
    },
  })
  async getProducts(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @GET('/:id', {
    summary: 'Получение продукта',
  })
  async getProduct(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @POST('/', {
    summary: 'Добавление продукта',
  })
  async createProduct(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @PATCH('/:id', {
    summary: 'Обновление продукта',
  })
  async updateProduct(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @DELETE('/:id', {
    summary: 'Удаление продукта',
  })
  async deleteProduct(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }
}

export default new Controller();
