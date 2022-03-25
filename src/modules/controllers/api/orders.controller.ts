import { NextFunction, Response } from 'express';
import { ApiController, GET, PATCH, POST } from '../../../core/api-decorators';
import { requireToken } from '../../../middlewares/require-token';
import { dtoValidator } from '../../../middlewares/validate';
import BaseRequest from '../../base/base.request';
import { OrderCreateDto } from '../../dto/order-create.dto';
import { RatingCreateDto } from '../../dto/rating-create.dto';
import ApiOrdersService from '../../services/api/api-orders.service';

@ApiController('/api/orders')
class Controller {
  @GET('/', {
    summary: 'Получение всех заказов пользователя',
    handlers: [requireToken],
  })
  async getOrders(req: BaseRequest, res: Response, next: NextFunction) {
    let userId = req.userId;
    const result = await ApiOrdersService.getOrders(userId);
    res.json(result);
  }

  //скорее всего впихнуть в стор
  @POST('/', {
    summary: 'Создание нового заказа',
    handlers: [requireToken, dtoValidator(OrderCreateDto)],
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
    handlers: [requireToken],
  })
  async getOrderById(req: BaseRequest, res: Response, next: NextFunction) {
    const result = await ApiOrdersService.getOrderById(req.params.id, req.userId);
    res.json(result);
  }

  @PATCH('/:orderId/addresses/:addressId', {
    summary: 'Изменение адреса в доставке',
    handlers: [requireToken],
  })
  async changeOrderAddress(req: BaseRequest, res: Response, next: NextFunction) {
    const result = await ApiOrdersService.changeAddress(req.params.orderId, req.userId, req.params.addressId);
    res.json(result);
  }

  @PATCH('/:id/cancel', {
    summary: 'Отмена заказа',
  })
  async cancelOrder(req: BaseRequest, res: Response, next: NextFunction) {
    const result = ApiOrdersService.cancelOrder(req.params.id, req.userId);
    res.json(result);
  }

  @POST('/:id/reviews', {
    summary: 'Создание отзыва',
    handlers: [requireToken, dtoValidator(RatingCreateDto)],
  })
  async createRating(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: RatingCreateDto = { ...req.body, userId: req.userId, orderId: req.params.id };
    const result = await ApiOrdersService.createReview(dto);
    res.json(result);
  }
}

export default new Controller();
