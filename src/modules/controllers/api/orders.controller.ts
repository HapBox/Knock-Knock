import { NextFunction, Response } from 'express';
import { ApiController, GET, PATCH, POST } from '../../../core/api-decorators';
import { requireToken } from '../../../middlewares/require-token';
import { dtoValidator } from '../../../middlewares/validate';
import APIAddressesModels from '../../../swagger/swagger-models/api/addresses';
import APIOrderModels from '../../../swagger/swagger-models/api/orders';
import APIRatingModels from '../../../swagger/swagger-models/api/ratings';
import SwaggerUtils from '../../../swagger/swagger-utils';
import BaseRequest from '../../base/base.request';
import { OrderCancelDto } from '../../dto/order-cancel.dto';
import { OrderCreateDto } from '../../dto/order-create.dto';
import { OrderGetDto } from '../../dto/order-get.dto';
import { OrderAddressUpdateDto } from '../../dto/orderAddress-update.dto';
import { RatingCreateDto } from '../../dto/rating-create.dto';
import ApiOrdersService from '../../services/api/api-orders.service';

@ApiController('/api/orders')
class Controller {
  @GET('/', {
    summary: 'Получение всех заказов пользователя',
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(APIOrderModels.resOrderInfoList)],
  })
  async getOrders(req: BaseRequest, res: Response, next: NextFunction) {
    let userId = req.userId;
    const result = await ApiOrdersService.getOrders(userId);
    res.json(result);
  }

  @POST('/', {
    summary: 'Создание нового заказа',
    handlers: [requireToken, dtoValidator(OrderCreateDto)],
    body: APIOrderModels.reqOrderCreate,
    responses: [SwaggerUtils.body200(APIOrderModels.resOrderInfo)],
  })
  async createOrder(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: OrderCreateDto = {
      ...req.body,
      userId: req.userId,
    };
    const result = await ApiOrdersService.createOrder(dto);
    res.json(result);
  }

  @GET('/:id', {
    summary: 'Получение заказа по id',
    handlers: [requireToken, dtoValidator(OrderGetDto)],
    responses: [SwaggerUtils.body200(APIOrderModels.resOrderInfo)],
  })
  async getOrderById(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: OrderGetDto = {
      userId: req.userId,
      orderId: req.params.id,
    };
    const result = await ApiOrdersService.getOrderById(dto);
    res.json(result);
  }

  @PATCH('/:orderId/addresses/:addressId', {
    summary: 'Изменение адреса в доставке',
    handlers: [requireToken, dtoValidator(OrderAddressUpdateDto)],
    body: APIAddressesModels.reqAddressCreate,
    responses: [SwaggerUtils.body200(APIOrderModels.resOrderInfo)],
  })
  async changeOrderAddress(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: OrderAddressUpdateDto = {
      orderId: req.params.orderId,
      userId: req.userId,
      addressId: req.params.addressId,
    };
    const result = await ApiOrdersService.changeAddress(dto);
    res.json(result);
  }

  @PATCH('/:id/cancel', {
    summary: 'Отмена заказа',
    handlers: [requireToken, dtoValidator(OrderCancelDto)],
    responses: [SwaggerUtils.body200(APIOrderModels.resOrderInfo)],
  })
  async cancelOrder(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: OrderCancelDto = {
      userId: req.userId,
      orderId: req.params.id,
    };
    const result = ApiOrdersService.cancelOrder(dto);
    res.json(result);
  }

  @POST('/:id/reviews', {
    summary: 'Создание отзыва',
    handlers: [requireToken, dtoValidator(RatingCreateDto)],
    body: APIRatingModels.reqRatingCreate,
    responses: [SwaggerUtils.body200(APIRatingModels.resRatingInfo)],
  })
  async createRating(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: RatingCreateDto = {
      ...req.body,
      userId: req.userId,
      orderId: req.params.id,
    };
    const result = await ApiOrdersService.createReview(dto);
    res.json(result);
  }
}

export default new Controller();
