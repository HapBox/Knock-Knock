import Filial from '../../../database/models/final/filial.model';
import Order from '../../../database/models/final/order.model';
import Rating from '../../../database/models/final/rating.model';
import Store from '../../../database/models/final/store.model';
import { StatusTypes } from '../../../utils/constants';
import { throwError } from '../../../utils/http-exception';
import { OrderCancelDto } from '../../dto/order-cancel.dto';
import { OrderCreateDto } from '../../dto/order-create.dto';
import { OrderGetDto } from '../../dto/order-get.dto';
import { OrderAddressUpdateDto } from '../../dto/orderAddress-update.dto';
import { RatingCreateDto } from '../../dto/rating-create.dto';

export default class ApiOrdersService {
  static async getOrders(userId: string) {
    const orderList = await Order.findAll({
      where: {
        userId: userId,
      },
    });
    return { orderList: orderList };
  }

  static async createOrder(dto: OrderCreateDto) {
    const order = await Order.create({ ...dto });
    return order;
  }

  static async getOrderById(dto: OrderGetDto) {
    const order = await Order.findOne({
      where: {
        id: dto.orderId,
        userId: dto.userId,
      },
    });
    return order;
  }

  static async changeAddress(dto: OrderAddressUpdateDto) {
    const order = await Order.findOne({
      where: {
        id: dto.orderId,
        userId: dto.userId,
      },
    });
    if (!order) {
      throwError({
        statusCode: 404,
        message: 'Not found.',
      });
    }

    await order.update({ addressId: dto.addressId });

    return order;
  }

  static async cancelOrder(dto: OrderCancelDto) {
    const order = await Order.findOne({
      where: {
        id: dto.orderId,
        userId: dto.userId,
      },
    });
    if (!order) {
      throwError({
        statusCode: 404,
        message: 'Not found.',
      });
    }
    await order.update({ status: StatusTypes.CANCELED });

    return order;
  }

  static async createReview(dto: RatingCreateDto) {
    const order = await Order.findByPk(dto.orderId, {
      include: [
        {
          model: Filial,
          include: [{ model: Store }],
        },
      ],
    });
    if (!order) {
      throwError({
        statusCode: 404,
        message: 'Not found.',
      });
    }
    if (order.status !== StatusTypes.READY) {
      throwError({
        statusCode: 404, //хз какой код в этом случае
        message: 'Вы еще не получили заказ, чтобы оценить магазин',
      });
    }

    const checkReview = await Rating.findOne({
      where: {
        userId: dto.userId,
        storeId: order.filial.store.id,
      },
    });

    if (checkReview) {
      throwError({
        statusCode: 404, //хз какой код в этом случае
        message: 'Вы уже писали отзыв о магазине',
      });
    }

    const review = await Rating.create({ ...dto, storeId: order.filial.store.id });
    return review;
  }
}
