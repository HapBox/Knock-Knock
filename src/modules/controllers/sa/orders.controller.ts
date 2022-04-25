import { NextFunction, Response } from 'express';
import { ApiController, GET, PATCH, POST } from '../../../core/api-decorators';
import { requireToken } from '../../../middlewares/require-token';
import { dtoValidator } from '../../../middlewares/validate';
import SAOrderModels from '../../../swagger/swagger-models/sa/orders';
import SwaggerUtils from '../../../swagger/swagger-utils';
import BaseRequest from '../../base/base.request';
import { OrderCreateDto } from '../../dto/order-create.dto';
import { OrderUpdateDto } from '../../dto/order-update.dto';
import SaOrdersService from '../../services/sa/sa-orders.service';

@ApiController('/sa/api/orders')
class Controller {
  @GET('/', {
    summary: 'Получение списка заказов',
    query: {
      'userId?': 'id клиента',
      'filialId?': 'id филиала',
      'storeId?': 'id магазина',
    },
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(SAOrderModels.resOrdersInfo)],
  })
  async getOrders(req: BaseRequest, res: Response, next: NextFunction) {
    let result;
    if (req.query.userId) {
      result = await SaOrdersService.getOrdersByClientId(String(req.query.userId));
    } else if (req.query.filialId) {
      result = await SaOrdersService.getOrdersByFilialId(String(req.query.filialId));
    } else if (req.query.storeId) {
      result = await SaOrdersService.getOrdersByStoreId(String(req.query.storeId));
    } else {
      result = await SaOrdersService.getOrders();
    }
    res.json(result);
  }

  @GET('/:id', {
    summary: 'Получение заказа по id',
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(SAOrderModels.resOrderInfo)],
  })
  async getOrderById(req: BaseRequest, res: Response, next: NextFunction) {
    const orderId: string = req.params.id;
    const result = await SaOrdersService.getOrderById(orderId);
    res.json(result);
  }

  @PATCH('/:id', {
    summary: 'Обновление информации заказа',
    handlers: [requireToken, dtoValidator(OrderUpdateDto)],
    responses: [SwaggerUtils.body200(SAOrderModels.resOrderInfo)],
  })
  async patchOrder(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: OrderUpdateDto = {
      ...req.body,
      orderId: req.params.id,
    };
    const result = await SaOrdersService.updateOrder(dto);
    res.json(result);
  }

  @PATCH('/:id/status/preparing', {
    summary: 'Подготовка',
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(SAOrderModels.resOrderInfo)],
  })
  async preparingOrder(req: BaseRequest, res: Response, next: NextFunction) {
    const orderId: string = req.params.id;
    const result = await SaOrdersService.prepareOrder(orderId);
    res.json(result);
  }

  @PATCH('/:id/status/canceled', {
    summary: 'Отмена заказа',
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(SAOrderModels.resOrderInfo)],
  })
  async canceledOrder(req: BaseRequest, res: Response, next: NextFunction) {
    const orderId: string = req.params.id;
    const result = await SaOrdersService.cancelOrder(orderId);
    res.json(result);
  }

  @PATCH('/:id/status/delivering', {
    summary: 'Доставление заказа',
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(SAOrderModels.resOrderInfo)],
  })
  async deliveringOrder(req: BaseRequest, res: Response, next: NextFunction) {
    const orderId: string = req.params.id;
    const result = await SaOrdersService.deliverOrder(orderId);
    res.json(result);
  }

  @PATCH('/:id/status/ready', {
    summary: 'Заказ выполнен',
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(SAOrderModels.resOrderInfo)],
  })
  async readyOrder(req: BaseRequest, res: Response, next: NextFunction) {
    const orderId: string = req.params.id;
    const result = await SaOrdersService.readyOrder(orderId);
    res.json(result);
  }

  @POST('/', {
    summary: 'Создание заказа для пользователя (если он позвонил по телефону)',
    handlers: [requireToken, dtoValidator(OrderCreateDto)],
    body: SAOrderModels.reqOrderCreate,
    responses: [SwaggerUtils.body200(SAOrderModels.resOrderInfo)],
  })
  async creatUserOrder(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: OrderCreateDto = req.body;
    const result = await SaOrdersService.createPhoneOrder(dto);
    res.json(result);
  }
}

export default new Controller();
