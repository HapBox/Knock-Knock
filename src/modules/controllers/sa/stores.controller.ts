import { NextFunction, Response } from 'express';
import { ApiController, DELETE, GET, PATCH, POST } from '../../../core/api-decorators';
import BaseRequest from '../../base/base.request';

@ApiController('/sa/api/stores')
class Controller {
  @GET('/', {
    summary: 'Получение списка магазинов',
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

  @DELETE('/:id', {
    summary: 'Удалить магазин по id',
  })
  async deleteStoreById(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @PATCH('/:id', {
    summary: 'Обновить информацию о магазине по id',
  })
  async patchStoreById(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @GET('/:id/filials', {
    summary: 'Получение списка филиалов магазина',
  })
  async getStoreFilials(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @POST('/:id/filials', {
    summary: 'Создание филиала магазина',
  })
  async createStoreFilials(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @PATCH('/:storeId/filials/:filialId', {
    summary: 'Обновление информации филиала магазина',
  })
  async patchStoreFilial(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @DELETE('/:storeId/filials/:filialId', {
    summary: 'Удаление филиала магазина',
  })
  async deleteStoreFilial(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @PATCH('/:id/workers/add', {
    summary: 'Добавление администратора магазина',
  })
  async addWorker(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @PATCH('/:storeId/workers/:workerId/remove', {
    summary: 'Удаление администратора магазина',
  })
  async removeWorker(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }
}

export default new Controller();
