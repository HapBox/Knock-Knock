import { NextFunction, Response } from 'express';
import { ApiController, GET, PATCH, POST } from '../../../core/api-decorators';
import BaseRequest from '../../base/base.request';

@ApiController('/sa/api/orders')
class Controller {
  @GET('/', {
    summary: 'Получение списка заказов',
    query: {
      'userId?': 'id клиента'
    }
  })
  async getOrders(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @GET('/:id', {
    summary: 'Получение заказа по id',
  })
  async getOrderById(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @PATCH('/:id', {
    summary: 'Обновление информации заказа',
  })
  async patchOrder(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @PATCH('/:id/status/preparing', {
    summary: 'Подготовка',
  })
  async preparingOrder(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @PATCH('/:id/status/canceled', {
    summary: 'Отмена заказа',
  })
  async canceledOrder(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @PATCH('/:id/status/delivering', {
    summary: 'Доставление заказа',
  })
  async deliveringOrder(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @PATCH('/:id/status/ready', {
    summary: 'Заказ выполнен',
  })
  async readyOrder(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @POST('/', {
    summary: 'Создание заказа для пользователя (если он позвонил по телефону)',
  })
  async creatUserOrder(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }
}

export default new Controller();
