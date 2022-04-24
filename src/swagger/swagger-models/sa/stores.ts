import SAFileModels from './file-db';
import SAProductsModels from './products';

export default class SAStoresModels {
  static reqStoreCreate = {
    name: 'Название магазина',
    phone: '88005553535',
    imageId: 'UUID',
  };

  static resStoreInfo = {
    id: 'UUID',
    name: 'Название магазина',
    phone: '88005553535',
    image: SAFileModels.resFileDB,
  };

  static resStoreFullInfo = {
    id: 'UUID',
    name: 'Название магазина',
    phone: '88005553535',
    image: SAFileModels.resFileDB,
    productList: [SAProductsModels.resProductInfoList],
  };

  static resStoreInfoList = {
    storeList: [SAStoresModels.resStoreInfo],
  };
}
