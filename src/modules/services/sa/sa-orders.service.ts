import Address from '../../../database/models/final/address.model';
import FileDB from '../../../database/models/final/file-db.model';
import Filial from '../../../database/models/final/filial.model';
import Order from '../../../database/models/final/order.model';
import Product from '../../../database/models/final/product.model';
import Store from '../../../database/models/final/store.model';
import OrderProduct from '../../../database/models/relations/order-product.model';
import { StatusTypes } from '../../../utils/constants';
import { throwError } from '../../../utils/http-exception';
import { OrderCreateDto } from '../../dto/order-create.dto';
import { OrderUpdateDto } from '../../dto/order-update.dto';

export default class SaOrdersService {
  static async getOrders() {
    const orderList = await Order.findAll({
      include: [
        {
          model: Filial,
          attributes: ['id'],
          include: [
            {
              model: Store,
              attributes: ['id', 'name', 'phone'],
              include: [
                {
                  model: FileDB,
                },
              ],
            },
          ],
        },
        { model: Address },
        { model: Product, attributes: ['id'], through: { attributes: ['count'] } },
      ],
    });
    return { orderList: orderList };
  }

  static async getOrdersByStoreId(storeId: string) {
    const filialList = await Filial.findAll({
      where: {
        storeId,
      },
      attributes: ['id'],
    });

    const filialIdList = filialList.map((filial) => filial.id);

    const orderList = await Order.findAll({
      where: {
        filialId: filialIdList,
      },
      include: [
        {
          model: Filial,
          attributes: ['id'],
          include: [
            {
              model: Store,
              attributes: ['id', 'name', 'phone'],
              include: [
                {
                  model: FileDB,
                },
              ],
            },
          ],
        },
        { model: Address },
        { model: Product, attributes: ['id'], through: { attributes: ['count'] } },
      ],
    });

    return { orderList: orderList };
  }

  static async getOrdersByFilialId(filialId: string) {
    const orderList = await Order.findAll({
      where: {
        filialId,
      },
      include: [
        {
          model: Filial,
          attributes: ['id'],
          include: [
            {
              model: Store,
              attributes: ['id', 'name', 'phone'],
              include: [
                {
                  model: FileDB,
                },
              ],
            },
          ],
        },
        { model: Address },
        { model: Product, attributes: ['id'], through: { attributes: ['count'] } },
      ],
    });

    return orderList;
  }

  static async getOrdersByClientId(clientId: string) {
    const orderList = await Order.findAll({
      where: {
        userId: clientId,
      },
      include: [
        {
          model: Filial,
          attributes: ['id'],
          include: [
            {
              model: Store,
              attributes: ['id', 'name', 'phone'],
              include: [
                {
                  model: FileDB,
                },
              ],
            },
          ],
        },
        { model: Address },
        { model: Product, attributes: ['id'], through: { attributes: ['count'] } },
      ],
    });

    return { orderList: orderList };
  }

  static async getOrderById(orderId: string) {
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: Filial,
          attributes: ['id'],
          include: [
            {
              model: Store,
              attributes: ['id', 'name', 'phone'],
              include: [
                {
                  model: FileDB,
                },
              ],
            },
          ],
        },
        { model: Address },
        { model: Product, attributes: ['id'], through: { attributes: ['count'] } },
      ],
    });

    if (!order)
      throwError({
        statusCode: 404,
        message: 'Order not found',
      });

    return order;
  }

  static async updateOrder(dto: OrderUpdateDto) {
    let order = await Order.findByPk(dto.orderId, {
      include: [
        {
          model: Filial,
          attributes: ['id'],
          include: [
            {
              model: Store,
              attributes: ['id', 'name', 'phone'],
              include: [
                {
                  model: FileDB,
                },
              ],
            },
          ],
        },
        { model: Address },
        { model: Product, attributes: ['id'], through: { attributes: ['count'] } },
      ],
    });

    if (!order)
      throwError({
        statusCode: 404,
        message: 'Order not found',
      });

    await order.update({ ...dto });
    return order;
  }

  static async prepareOrder(orderId: string) {
    let order = await Order.findByPk(orderId, {
      include: [
        {
          model: Filial,
          attributes: ['id'],
          include: [
            {
              model: Store,
              attributes: ['id', 'name', 'phone'],
              include: [
                {
                  model: FileDB,
                },
              ],
            },
          ],
        },
        { model: Address },
        { model: Product, attributes: ['id'], through: { attributes: ['count'] } },
      ],
    });

    if (!order)
      throwError({
        statusCode: 404,
        message: 'Order not found',
      });

    if (order.status === StatusTypes.PREPARING)
      throwError({
        statusCode: 400,
        message: 'Order already preparing',
      });

    await order.update({
      status: StatusTypes.PREPARING,
    });

    return order;
  }

  static async cancelOrder(orderId: string) {
    let order = await Order.findByPk(orderId, {
      include: [
        {
          model: Filial,
          attributes: ['id'],
          include: [
            {
              model: Store,
              attributes: ['id', 'name', 'phone'],
              include: [
                {
                  model: FileDB,
                },
              ],
            },
          ],
        },
        { model: Address },
        { model: Product, attributes: ['id'], through: { attributes: ['count'] } },
      ],
    });

    if (!order)
      throwError({
        statusCode: 404,
        message: 'Order not found',
      });

    if (order.status === StatusTypes.CANCELED)
      throwError({
        statusCode: 400,
        message: 'Order already canceled',
      });

    await order.update({
      status: StatusTypes.CANCELED,
    });

    return order;
  }

  static async deliverOrder(orderId: string) {
    let order = await Order.findByPk(orderId, {
      include: [
        {
          model: Filial,
          attributes: ['id'],
          include: [
            {
              model: Store,
              attributes: ['id', 'name', 'phone'],
              include: [
                {
                  model: FileDB,
                },
              ],
            },
          ],
        },
        { model: Address },
        { model: Product, attributes: ['id'], through: { attributes: ['count'] } },
      ],
    });

    if (!order)
      throwError({
        statusCode: 404,
        message: 'Order not found',
      });

    if (order.status === StatusTypes.DELIVERING)
      throwError({
        statusCode: 400,
        message: 'Order already delivering',
      });

    await order.update({
      status: StatusTypes.DELIVERING,
    });

    return order;
  }

  static async readyOrder(orderId: string) {
    let order = await Order.findByPk(orderId, {
      include: [
        {
          model: Filial,
          attributes: ['id'],
          include: [
            {
              model: Store,
              attributes: ['id', 'name', 'phone'],
              include: [
                {
                  model: FileDB,
                },
              ],
            },
          ],
        },
        { model: Address },
        { model: Product, attributes: ['id'], through: { attributes: ['count'] } },
      ],
    });

    if (!order)
      throwError({
        statusCode: 404,
        message: 'Order not found',
      });

    if (order.status === StatusTypes.READY)
      throwError({
        statusCode: 400,
        message: 'Order already done',
      });

    await order.update({
      status: StatusTypes.READY,
    });

    return order;
  }

  static async createPhoneOrder(dto: OrderCreateDto) {
    const address = await Address.create({ ...dto.userAddress });
    const order = await Order.create({
      ...dto,
      userAddressId: address.id,
    });
    let productList = [];
    for (let i = 0; i < dto.productList.length; i++) {
      let product = await OrderProduct.create({
        orderId: order.id,
        productId: dto.productList[i].productId,
        count: dto.productList[i].count,
      });
      productList.push(product);
    }

    return order;
  }
}
