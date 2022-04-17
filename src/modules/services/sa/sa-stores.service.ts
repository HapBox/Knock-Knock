import Address from '../../../database/models/final/address.model';
import Filial from '../../../database/models/final/filial.model';
import Product from '../../../database/models/final/product.model';
import Store from '../../../database/models/final/store.model';
import User from '../../../database/models/final/user.model';
import { throwError } from '../../../utils/http-exception';
import { FilialCreateDto } from '../../dto/filial-create.dto';
import { FilialUpdateDto } from '../../dto/filial-update.dto';
import { StoreCreateDto } from '../../dto/store-create.dto';
import { StoreUpdateDto } from '../../dto/store-update.dto';
import { StoreFilialDeleteDto } from '../../dto/storeFilial-delete.dto';
import { StoreWorkerAddDto } from '../../dto/storeWorker-add.dto';
import { StoreWorkerDeleteDto } from '../../dto/storeWorker-delete.dto';

export default class SaStoresService {
  static async getStores() {
    const storeList = await Store.findAll({
      include: [
        {
          model: Product,
          duplicating: false,
        },
      ],
    });

    const result: any[] = storeList.map((el) => {
      return {
        store: el.name,
        count: el.productList.length,
      };
    });

    return { storeList: result };
  }

  static async createStore(dto: StoreCreateDto) {
    
    const store = await Store.create({ ...dto });
    return store;
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

    return { filialList: filialList };
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

  static async deleteStoreFilial(dto: StoreFilialDeleteDto) {
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

    await address?.destroy();
    await filial.destroy();

    return { message: 'Delete succesfull' };
  }

  static async addWorker(dto: StoreWorkerAddDto) {
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
}
