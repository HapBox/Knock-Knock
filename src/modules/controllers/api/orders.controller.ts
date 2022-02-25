import { NextFunction, Response } from 'express';
import { ApiController, GET, PATCH, POST } from '../../../core/api-decorators';
import BaseRequest from '../../base/base.request';

@ApiController('/api/orders')
class Controller {
  @POST('/', {
    summary: 'Создание нового заказа',
  })
  async createOrder(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @GET('/', {
    summary: 'Получение списка заказов',
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

  @PATCH('/:orderId/addresses/:addressId', {
    summary: 'Изменение адреса в доставке',
  })
  async changeOrderAddress(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @PATCH('/:id/cancel', {
    summary: 'Отмена заказа',
  })
  async cancelOrder(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @POST('/:id/reviews', {
    summary: 'Создание отзыва',
  })
  async createRating(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }
}

export default new Controller();
