import Filial from '../../../database/models/final/filial.model';
import Order from '../../../database/models/final/order.model';
import Rating from '../../../database/models/final/rating.model';
import Store from '../../../database/models/final/store.model';
import { StatusTypes } from '../../../utils/constants';
import { throwError } from '../../../utils/http-exception';
import { AddressCreateDto } from '../../dto/address-create.dto';
import { RatingCreateDto } from '../../dto/rating-create.dto';

export default class ApiOrdersService {
  static async getOrder(orderId: string, userId: string) {
    const order = await Order.findOne({
      where: {
        id: orderId,
        userId: userId,
      },
    });
    return order;
  }

  static async changeAddress(orderId: string, userId: string, addressId: string) {
    const order = await Order.findOne({
      where: {
        id: orderId,
        userId: userId,
      },
    });
    if (!order) {
      throwError({
        statusCode: 404,
        message: 'Not found.',
      });
    }
    return await order.update({ addressId: addressId });
  }

  static async cancelOrder(orderId: string, userId: string) {
    const order = await Order.findOne({
      where: {
        id: orderId,
        userId: userId,
      },
    });
    if (!order) {
      throwError({
        statusCode: 404,
        message: 'Not found.',
      });
    }
    return await order.update({ status: StatusTypes.CANCELED });
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
