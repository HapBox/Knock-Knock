import Address from '../../../database/models/final/address.model';
import Filial from '../../../database/models/final/filial.model';
import Product from '../../../database/models/final/product.model';
import Promotion from '../../../database/models/final/promotion.model';
import Store from '../../../database/models/final/store.model';
import User from '../../../database/models/final/user.model';
import { RoleTypes } from '../../../utils/constants';
import { throwError } from '../../../utils/http-exception';
import { BaseDto } from '../../base/base.dto';
import { FilialCreateDto } from '../../dto/filial-create.dto';
import { FilialUpdateDto } from '../../dto/filial-update.dto';
import { ProductCreateDto } from '../../dto/product-create.dto';
import { ProductGetDeleteOneDto } from '../../dto/product-get-delete-one.dto';
import { ProductUpdateDto } from '../../dto/product-update.dto';
import { PromotionCreateDto } from '../../dto/promotion-create.dto';
import { PromotionDeleteDto } from '../../dto/promotion-delete.dto';
import { StoreCreateDto } from '../../dto/store-create.dto';
import { StoreGetDeleteOneDto } from '../../dto/store-get-delete-one.dto';
import { StoreUpdateDto } from '../../dto/store-update.dto';
import { StoreFilialDeleteDto } from '../../dto/storeFilial-delete.dto';
import { StoreWorkerAddDto } from '../../dto/storeWorker-add.dto';
import { StoreWorkerDeleteDto } from '../../dto/storeWorker-delete.dto';

export default class SaStoresService {
  static async getStores(dto: BaseDto) {
    let storeList;
    if (dto.userRole === RoleTypes.ADMIN) {
      storeList = await Store.findAll({
        include: [
          {
            model: Product,
            duplicating: false,
          },
        ],
      });
    } else {
      storeList = await Store.findAll({
        where: {
          id: dto.workStoreId,
        },
        include: [
          {
            model: Product,
            duplicating: false,
          },
        ],
      });
    }
    const result: any[] = storeList.map((el) => {
      return {
        store: el.name,
        count: el.productList.length,
      };
    });

    return { storeList: result };
  }

  static async createStore(dto: StoreCreateDto) {
    if (dto.userRole !== RoleTypes.ADMIN) {
      throwError({
        statusCode: 403,
        message: 'You are not admin',
      });
    }
    const store = await Store.create({ ...dto });
    return store;
  }

  static async getStoreById(dto: StoreGetDeleteOneDto) {
    if (dto.userRole !== RoleTypes.ADMIN && dto.workStoreId !== dto.storeId) {
      throwError({
        statusCode: 403,
        message: 'Access denied',
      });
    }

    const store = await Store.findByPk(dto.storeId);
    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }
    const productList = await Product.findAll({
      where: {
        storeId: dto.storeId,
      },
    });
    return { store: store, productList: productList };
  }

  static async deleteStoreById(dto: StoreGetDeleteOneDto) {
    if (dto.userRole !== RoleTypes.ADMIN) {
      throwError({
        statusCode: 403,
        message: 'You are not admin',
      });
    }
    const store = await Store.findByPk(dto.storeId);

    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }
    await store.destroy();
    return { message: 'Delete succesfull' };
  }

  static async updateStoreById(dto: StoreUpdateDto) {
    if (dto.userRole !== RoleTypes.ADMIN && dto.workStoreId !== dto.storeId) {
      throwError({
        statusCode: 403,
        message: 'Access denied',
      });
    }
    let store = await Store.findByPk(dto.storeId);

    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }
    store.update({
      ...dto,
    });
    return store;
  }

  static async getStoreFilials(dto: StoreGetDeleteOneDto) {
    if (dto.userRole !== RoleTypes.ADMIN && dto.workStoreId !== dto.storeId) {
      throwError({
        statusCode: 403,
        message: 'Access denied',
      });
    }
    const store = await Store.findByPk(dto.storeId);

    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }
    const filialList = await Filial.findAll({
      where: {
        storeId: dto.storeId,
      },
      include: {
        model: Address,
      },
    });
    return { filialList: filialList };
  }

  static async createStoreFilial(dto: FilialCreateDto) {
    if (dto.userRole !== RoleTypes.ADMIN && dto.workStoreId !== dto.storeId) {
      throwError({
        statusCode: 403,
        message: 'Access denied',
      });
    }
    const store = await Store.findByPk(dto.storeId);

    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }

    const address = await Address.create({
      //хзхз
      ...dto.address,
    });

    const filial = await Filial.create({
      addressId: address.id,
      ...dto,
    });

    return filial;
  }

  static async updateStoreFilial(dto: FilialUpdateDto) {
    if (dto.userRole !== RoleTypes.ADMIN && dto.workStoreId !== dto.storeId) {
      throwError({
        statusCode: 403,
        message: 'Access denied',
      });
    }
    const store = await Store.findByPk(dto.storeId);

    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }

    const filial = await Filial.findByPk(dto.filialId);

    if (!filial) {
      throwError({
        statusCode: 404,
        message: 'Filial not found',
      });
    }

    let address = await Address.findByPk(filial.addressId);

    if (!address) {
      throwError({
        statusCode: 404,
        message: 'Address not found',
      });
    }
    await address.update({ ...dto.address });
    return address;
  }

  static async deleteStoreFilial(dto: StoreFilialDeleteDto) {
    if (dto.userRole !== RoleTypes.ADMIN && dto.workStoreId !== dto.storeId) {
      throwError({
        statusCode: 403,
        message: 'Access denied',
      });
    }

    const store = await Store.findByPk(dto.storeId);
    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }

    const filial = await Filial.findByPk(dto.filialId);
    if (!filial) {
      throwError({
        statusCode: 404,
        message: 'Filial not found',
      });
    }

    const address = await Address.findByPk(filial.addressId);
    if (!address) {
      throwError({
        statusCode: 404,
        message: 'Address not found',
      });
    }

    await address.destroy();
    await filial.destroy();
    return { message: 'Delete succesfull' };
  }

  static async addWorker(dto: StoreWorkerAddDto) {
    if (dto.userRole !== RoleTypes.ADMIN) {
      throwError({
        statusCode: 403,
        message: 'Access denied',
      });
    }

    const store = await Store.findByPk(dto.storeId);
    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }

    let user = await User.findOne({
      where: {
        phone: dto.workerPhone,
      },
    });

    if (!user) {
      throwError({
        statusCode: 404,
        message: 'User not found',
      });
    }

    if (user.workStoreId) {
      throwError({
        statusCode: 400,
        message: 'User already works for another store',
      });
    }

    user.update({
      workStoreId: dto.storeId,
    });
    return user;
  }

  static async removeWorker(dto: StoreWorkerDeleteDto) {
    if (dto.userRole !== RoleTypes.ADMIN) {
      throwError({
        statusCode: 403,
        message: 'Access denied',
      });
    }

    const store = await Store.findByPk(dto.storeId);
    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }

    let user = await User.findOne({
      where: {
        id: dto.workerId,
        workStoreId: dto.storeId,
      },
    });
    if (!user) {
      throwError({
        statusCode: 404,
        message: 'Worker not found',
      });
    }

    user.update({
      workStoreId: null,
    });
    return { message: 'Worker removed' };
  }

  static async createProduct(dto: ProductCreateDto) {
    if (dto.userRole !== RoleTypes.ADMIN && dto.workStoreId !== dto.storeId) {
      throwError({
        statusCode: 403,
        message: 'Access denied',
      });
    }
    const product = await Product.create(dto);
    return product;
  }

  static async getProductsByStoreId(dto: StoreGetDeleteOneDto) {
    if (dto.userRole !== RoleTypes.ADMIN && dto.workStoreId !== dto.storeId) {
      throwError({
        statusCode: 403,
        message: 'Access denied',
      });
    }
    const productList = await Product.findAll({
      where: {
        storeId: dto.storeId,
      },
      include: [
        {
          model: Promotion,
          duplicating: false,
        },
      ],
    });
    return { productList: productList };
  }

  static async getProductById(dto: ProductGetDeleteOneDto) {
    const product = await Product.findByPk(dto.productId, {
      include: [
        {
          model: Promotion,
          duplicating: false,
        },
      ],
    });
    if (!product) {
      throwError({
        statusCode: 404,
        message: 'Product not found',
      });
    }

    if (dto.userRole !== RoleTypes.ADMIN && dto.workStoreId !== product.storeId) {
      throwError({
        statusCode: 403,
        message: 'Access denied',
      });
    }
    return product;
  }

  static async updateProductById(dto: ProductUpdateDto) {
    if (dto.userRole !== RoleTypes.ADMIN && dto.workStoreId !== dto.workStoreId) {
      throwError({
        statusCode: 403,
        message: 'Access denied',
      });
    }
    const product = await Product.findByPk(dto.productId, {
      include: [
        {
          model: Promotion,
          duplicating: false,
        },
      ],
    });
    if (!product) {
      throwError({
        statusCode: 404,
        message: 'Product not found',
      });
    }
    await product.update({
      ...dto,
    });
    return product;
  }

  static async deleteProductById(dto: ProductGetDeleteOneDto) {
    const product = await Product.findByPk(dto.productId);
    if (!product) {
      throwError({
        statusCode: 404,
        message: 'Product not found',
      });
    }
    if (dto.userRole !== RoleTypes.ADMIN && dto.workStoreId !== product.storeId) {
      throwError({
        statusCode: 403,
        message: 'Access denied',
      });
    }

    await product.destroy();
    return { message: 'Delete succesfull' };
  }

  static async createPromotion(dto: PromotionCreateDto) {
    if (dto.userRole !== RoleTypes.ADMIN && dto.workStoreId !== dto.storeId) {
      throwError({
        statusCode: 403,
        message: 'Access denied',
      });
    }

    let product = await Product.findByPk(dto.productId);
    if (!product)
      throwError({
        statusCode: 404,
        message: 'Product not found',
      });

    let promotion = await Promotion.create({
      ...dto,
    });
    await product.update({
      promotionId: promotion.id,
    });
    return promotion;
  }

  static async deletePromotion(dto: PromotionDeleteDto) {
    if (dto.userRole !== RoleTypes.ADMIN && dto.workStoreId !== dto.storeId) {
      throwError({
        statusCode: 403,
        message: 'Access denied',
      });
    }

    let product = await Product.findByPk(dto.productId);
    if (!product)
      throwError({
        statusCode: 404,
        message: 'Product not found',
      });

    const promotion = await Promotion.findByPk(product.promotionId);
    if (!promotion) {
      throwError({
        statusCode: 404,
        message: 'Promotion not found',
      });
    }
    await promotion.destroy();
    await product.update({ promotionId: null });
    return { message: 'Delete succesfull' };
  }
}
