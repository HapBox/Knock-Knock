import { NextFunction, Response } from 'express';
import { ApiController, DELETE, GET, PATCH, POST } from '../../../core/api-decorators';
import BaseRequest from '../../base/base.request';

@ApiController('/sa/api/admins')
class Controller {
  @GET('/', {
    summary: 'Получение списка всех админов',
  })
  async getAdmins(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @GET('/:id', {
    summary: 'Получение информации о админе',
  })
  async getAdmin(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @PATCH('/:id', {
    summary: 'Обновление информации о админе по id',
  })
  async patchAdmin(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @PATCH('/:id/block', { 
    summary: 'Блокировка админа по id',
  })
  async blockAdmin(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @PATCH('/:id/unblock', { 
    summary: 'Разблокировка админа по id',
  })
  async unblockAdmin(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @POST('/', {
    summary: 'Создание администратора',
  })
  async createAdmin(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @PATCH('/:id/dismiss', {
   summary: 'Увольнение админа (понижение в правах)',
  })
  async dismissAdmin(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }
}

export default new Controller();
