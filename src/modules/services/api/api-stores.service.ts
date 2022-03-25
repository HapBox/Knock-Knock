import { Op } from 'sequelize';
import Filial from '../../../database/models/final/filial.model';
import Product from '../../../database/models/final/product.model';
import Rating from '../../../database/models/final/rating.model';
import Store from '../../../database/models/final/store.model';
import User from '../../../database/models/final/user.model';
import { throwError } from '../../../utils/http-exception';
import { StoreFilialGetDto } from '../../dto/storeFilial-get.dto';

export default class ApiStoresService {
  static async getStoresByCategory(categoryId: string) {
    //переделать и продумать нормально
    const stores = await Store.findAll({
      where: {
        categoryId,
      },
    });
    return { storeList: stores };
  }

  static async getStoresBySearch(searchValue: string) {
    const stores = await Store.findAll({
      where: {
        name: {
          [Op.iLike]: '%' + searchValue + '%',
        },
      },
    });
    return { storeList: stores };
  }

  static async getStoreById(storeId: string) {
    const store = await Store.findByPk(storeId);

    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }
    const productList = await Product.findAll({
      where: {
        storeId,
      },
    });
    return { store: store, productList: productList };
  }

  static async getFilialList(storeId: string) {
    const filialList = await Filial.findAll({
      where: {
        storeId: storeId,
      },
    });
    return { filialList: filialList };
  }

  static async getFilialById(dto: StoreFilialGetDto) {
    const filial = await Filial.findOne({
      where: {
        id: dto.filialId,
        storeId: dto.storeId,
      },
    });
    if (!filial) {
      throwError({
        statusCode: 404,
        message: 'Not found.',
      });
    }
    return filial;
  }

  static async getReviewList(storeId: string) {
    const reviewList = await Rating.findAll({
      where: {
        storeId: storeId,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
          duplicating: false,
        },
      ],
    });
    return { reviewList: reviewList };
  }

  static async getProductsByCategory(categoryId: string, storeId: string) {
    const products = await Product.findAll({
      where: {
        storeId,
        categoryId,
      },
    });
    return { productList: products };
  }

  static async getProductsBySearch(searchValue: string, storeId: string) {
    const products = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: '%' + searchValue + '%',
        },
        storeId,
      },
    });
    return { productList: products };
  }

  static async getProductsList(storeId: string) {
    const productList = await Product.findAll({
      where: {
        storeId,
      },
    });
    return { productList: productList };
  }

  static async getProductById(productId: string) {
    const product = await Product.findByPk(productId);
    return product;
  }
}