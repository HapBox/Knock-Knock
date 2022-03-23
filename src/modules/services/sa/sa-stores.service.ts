import Address from '../../../database/models/final/address.model';
import Filial from '../../../database/models/final/filial.model';
import Store from '../../../database/models/final/store.model';
import User from '../../../database/models/final/user.model';
import { throwError } from '../../../utils/http-exception';
import { AddressUpdateDto } from '../../dto/address-update.dto';
import { FilialCreateDto } from '../../dto/filial-create.dto';
import { StoreUpdateDto } from '../../dto/store-update.dto';

export default class SaStoresService {
  static async getStores() {
    let storeList = await Store.findAll();
    return storeList;
  }

  static async getStoreById(storeId: string) {
    let store = await Store.findByPk(storeId);

    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }

    return store;
  }

  static async deleteStoreById(storeId: string) {
    let store = await Store.findByPk(storeId);

    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }

    await store.destroy();
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
    let store = await Store.findByPk(storeId);

    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }

    let filialList = await Filial.findAll({
      where: {
        storeId: storeId,
      },
    });

    return filialList;
  }

  static async createStoreFilial(dto: FilialCreateDto) {
    let store = await Store.findByPk(dto.storeId);

    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }

    let address = await Address.create({
      ...dto.address,
    });

    let filial = await Filial.create({
      addressId: address.id,
      ...dto
    });

    return filial;
  }

  static async updateStoreFilial(storeId: string, filialId: string, dto: AddressUpdateDto) {
    let store = await Store.findByPk(storeId);

    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }

    let filial = await Filial.findByPk(filialId);

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
    await address.update({ ...dto });
    return address;
  }

  static async deleteStoreFilial(storeId: string, filialId: string) {
    let store = await Store.findByPk(storeId);

    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }

    let filial = await Filial.findByPk(filialId);

    if (!filial) {
      throwError({
        statusCode: 404,
        message: 'Filial not found',
      });
    }

    let address = await Address.findByPk(filial.addressId);

    await address?.destroy();
    await filial.destroy();
  }

  static async addWorker(storeId: string, workerId: string) {
    let store = await Store.findByPk(storeId);

    if (!store) {
      throwError({
        statusCode: 404,
        message: 'Store not found',
      });
    }

    let user = await User.findByPk(workerId);

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
    let store = await Store.findByPk(storeId);

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
  }
}
