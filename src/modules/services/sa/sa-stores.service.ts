import Address from '../../../database/models/final/address.model';
import Filial from '../../../database/models/final/filial.model';
import Product from '../../../database/models/final/product.model';
import Store from '../../../database/models/final/store.model';
import User from '../../../database/models/final/user.model';
import { throwError } from '../../../utils/http-exception';
import { FilialCreateDto } from '../../dto/filial-create.dto';
import { FilialUpdateDto } from '../../dto/filial-update.dto';
import { StoreUpdateDto } from '../../dto/store-update.dto';

export default class SaStoresService {
  static async getStores() {
    const storeList = await Store.findAll();

    let result: Array<Object> = [];
    storeList.forEach(async (store) => {
      result.push({
        store,
        number: await Product.count({
          where: {
            storeId: store.id,
          },
        }),
      });
    });

    return result;
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

    return { store, productList };
  }

  static async deleteStoreById(storeId: string) {
    const store = await Store.findByPk(storeId);

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

  static async getStoreFilials(storeId: string) {
    const store = await Store.findByPk(storeId);

    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }

    const filialList = await Filial.findAll({
      where: {
        storeId: storeId,
      },
    });

    return filialList;
  }

  static async createStoreFilial(dto: FilialCreateDto) {
    const store = await Store.findByPk(dto.storeId);

    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }

    const address = await Address.create({
      ...dto.address,
    });

    const filial = await Filial.create({
      addressId: address.id,
      ...dto,
    });

    return filial;
  }

  static async updateStoreFilial(dto: FilialUpdateDto) {
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

  static async deleteStoreFilial(storeId: string, filialId: string) {
    const store = await Store.findByPk(storeId);

    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }

    const filial = await Filial.findByPk(filialId);

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

    await address?.destroy();
    await filial.destroy();

    return { message: 'Delete succesfull' };
  }

  static async addWorker(storeId: string, workerPhone: string) {
    const store = await Store.findByPk(storeId);

    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }

    let user = await User.findOne({
      where: {
        phone: workerPhone,
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
      workStoreId: storeId,
    });
    return user;
  }

  static async removeWorker(storeId: string, workerId: string) {
    const store = await Store.findByPk(storeId);

    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }

    let user = await User.findOne({
      where: {
        id: workerId,
        workStoreId: storeId,
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
}
