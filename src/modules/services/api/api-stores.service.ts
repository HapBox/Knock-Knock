import { ParsedQs } from 'qs';
import { Op } from 'sequelize';
import Address from '../../../database/models/final/address.model';
import Category from '../../../database/models/final/category.model';
import FileDB from '../../../database/models/final/file-db.model';
import Filial from '../../../database/models/final/filial.model';
import Product from '../../../database/models/final/product.model';
import Rating from '../../../database/models/final/rating.model';
import Store from '../../../database/models/final/store.model';
import User from '../../../database/models/final/user.model';
import { throwError } from '../../../utils/http-exception';
import { FilialGetByCity } from '../../dto/filials-get-by-city';
import { StoreFilialGetDto } from '../../dto/storeFilial-get.dto';

export default class ApiStoresService {
  static async getStores(query: ParsedQs) {
    let stores;
    if (query.category) {
      stores = await Store.findAll({
        attributes: ['id', 'name', 'phone'],
        include: [
          {
            model: Product,
            duplicating: false,
            attributes: ['id'],
            where: {
              categoryId: query.category,
            },
            required: true,
          },
          {
            model: FileDB,
            duplicating: false,
          },
          {
            model: Filial,
            duplicating: false,
            attributes: ['id'],
            include: [
              {
                model: Address,
                attributes: ['id'],
                where: {
                  city: query.city,
                },
                required: true,
              },
            ],
            required: true,
          },
        ],
      });
    } else if (query.searchValue) {
      stores = await Store.findAll({
        attributes: ['id', 'name', 'phone'],
        where: {
          name: {
            [Op.iLike]: '%' + query.searchValue + '%',
          },
        },
        include: [
          {
            model: Filial,
            duplicating: false,
            attributes: ['id'],
            include: [
              {
                model: Address,
                attributes: ['id'],
                where: {
                  city: query.city,
                },
                required: true,
              },
            ],
            limit: 1,
            required: true,
          },
          {
            model: FileDB,
            duplicating: false,
          },
        ],
      });
    } else {
      stores = await Store.findAll({
        attributes: ['id', 'name', 'phone'],
        include: [
          {
            model: Filial,
            attributes: ['id'],
            include: [
              {
                model: Address,
                attributes: ['id'],
                where: {
                  city: query.city,
                },
                required: true,
              },
            ],
            required: true,
          },
          {
            model: FileDB,
            duplicating: false,
          },
        ],
      });
    }
    return { storeList: stores };
  }

  static async getStoreById(storeId: string) {
    const store = await Store.findByPk(storeId, {
      include: [
        {
          model: FileDB,
        },
        {
          model: Product,
          include: [
            {
              model: FileDB,
            },
            {
              model: Category,
            },
          ],
        },
      ],
    });

    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }
    return store;
  }

  static async getFilialList(dto: FilialGetByCity) {
    const filialList = await Filial.findAll({
      where: {
        storeId: dto.storeId,
      },
      include: { model: Address, where: { city: dto.city } },
    });
    return { filialList: filialList };
  }

  static async getFilialById(dto: StoreFilialGetDto) {
    const filial = await Filial.findOne({
      where: {
        id: dto.filialId,
        storeId: dto.storeId,
      },
      include: {
        model: Address,
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
          attributes: ['firstName', 'lastName'],
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
      include: [
        {
          model: Category,
        },
        {
          model: FileDB,
        },
      ],
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
      include: [
        {
          model: Category,
        },
        {
          model: FileDB,
        },
      ],
    });
    return { productList: products };
  }

  static async getProductsList(storeId: string) {
    const productList = await Product.findAll({
      where: {
        storeId,
      },
      include: [
        {
          model: Category,
        },
        {
          model: FileDB,
        },
      ],
    });
    return { productList: productList };
  }

  static async getProductById(productId: string) {
    const product = await Product.findByPk(productId, {
      include: [
        {
          model: Category,
        },
        {
          model: FileDB,
        },
      ],
    });
    return product;
  }
}
