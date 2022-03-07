import { NextFunction, Response } from 'express';
import { ApiController, GET, PATCH, POST } from '../../../core/api-decorators';
import { requireToken } from '../../../middlewares/require-token';
import { dtoValidator } from '../../../middlewares/validate';
import BaseRequest from '../../base/base.request';
import { OrderCreateDto } from '../../dto/order-create.dto';
import SaOrdersService from '../../services/sa/sa-orders.service';

@ApiController('/sa/api/orders')
class Controller {
  @GET('/', {
    summary: 'Получение списка заказов',
    query: {
      'userId?': 'id клиента',
    },
    handlers: [requireToken],
  })
  async getOrders(req: BaseRequest, res: Response, next: NextFunction) {
    let userId: string = String(req.query.userId);
    let ordeList = await SaOrdersService.getOrdersByClientId(userId);
    res.json(ordeList);
  }

  @GET('/:id', {
    summary: 'Получение заказа по id',
    handlers: [requireToken],
  })
  async getOrderById(req: BaseRequest, res: Response, next: NextFunction) {
    let orderId: string = req.params.id;
    let order = await SaOrdersService.getOrderById(orderId);
    res.json(order);
  }

  @PATCH('/:id', {
    summary: 'Обновление информации заказа',
    handlers: [requireToken],
  })
  async patchOrder(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @PATCH('/:id/status/preparing', {
    summary: 'Подготовка',
    handlers: [requireToken],
  })
  async preparingOrder(req: BaseRequest, res: Response, next: NextFunction) {
    let orderId: string = req.params.id;
    let order = SaOrdersService.prepareOrder(orderId);
    res.json(order);
  }

  @PATCH('/:id/status/canceled', {
    summary: 'Отмена заказа',
    handlers: [requireToken],
  })
  async canceledOrder(req: BaseRequest, res: Response, next: NextFunction) {
    let orderId: string = req.params.id;
    let order = SaOrdersService.cancelOrder(orderId);
    res.json(order);
  }

  @PATCH('/:id/status/delivering', {
    summary: 'Доставление заказа',
    handlers: [requireToken],
  })
  async deliveringOrder(req: BaseRequest, res: Response, next: NextFunction) {
    let orderId: string = req.params.id;
    let order = SaOrdersService.deliverOrder(orderId);
    res.json(order);
  }

  @PATCH('/:id/status/ready', {
    summary: 'Заказ выполнен',
    handlers: [requireToken],
  })
  async readyOrder(req: BaseRequest, res: Response, next: NextFunction) {
    let orderId: string = req.params.id;
    let order = SaOrdersService.readyOrder(orderId);
    res.json(order);
  }

  @POST('/', {
    summary: 'Создание заказа для пользователя (если он позвонил по телефону)',
    handlers: [requireToken, dtoValidator(OrderCreateDto)],
  })
  async creatUserOrder(req: BaseRequest, res: Response, next: NextFunction) {
    let dto = req.body;
    let order = await SaOrdersService.createPhoneOrder(dto);
    res.json(order);
  }
}

export default new Controller();
