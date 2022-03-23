import { NextFunction, Response } from 'express';
import { ApiController, GET, PATCH, POST } from '../../../core/api-decorators';
import { requireToken } from '../../../middlewares/require-token';
import { dtoValidator } from '../../../middlewares/validate';
import BaseRequest from '../../base/base.request';
import { RatingCreateDto } from '../../dto/rating-create.dto';
import ApiOrdersService from '../../services/api/api-orders.service';

@ApiController('/api/orders')
class Controller {
  //скорее всего впихнуть в стор
  @POST('/', {
    summary: 'Создание нового заказа',
  })
  async createOrder(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @GET('/:id', {
    summary: 'Получение заказа по id',
    handlers: [requireToken],
  })
  async getOrderById(req: BaseRequest, res: Response, next: NextFunction) {
    const order = await ApiOrdersService.getOrder(req.params.id, req.userId);
    res.json(order);
  }

  @PATCH('/:orderId/addresses/:addressId', {
    summary: 'Изменение адреса в доставке',
    handlers: [requireToken],
  })
  async changeOrderAddress(req: BaseRequest, res: Response, next: NextFunction) {
    const order = await ApiOrdersService.changeAddress(req.params.orderId, req.userId, req.params.addressId);
    res.json(order);
  }

  @PATCH('/:id/cancel', {
    summary: 'Отмена заказа',
  })
  async cancelOrder(req: BaseRequest, res: Response, next: NextFunction) {
    const order = ApiOrdersService.cancelOrder(req.params.id, req.userId);
    res.json(order);
  }

  @POST('/:id/reviews', {
    summary: 'Создание отзыва',
    handlers: [requireToken, dtoValidator(RatingCreateDto)],
  })
  async createRating(req: BaseRequest, res: Response, next: NextFunction) {
    const dto = { ...req.body, userId: req.userId, orderId: req.params.id };
    const review = await ApiOrdersService.createReview(dto);
    res.json(review);
  }
}

export default new Controller();
