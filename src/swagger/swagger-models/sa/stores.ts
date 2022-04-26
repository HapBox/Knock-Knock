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
    productList: [SAProductsModels.resProductInfo],
  };

  static resStoreOrderInfo = {
    id: 'UUID',
    name: 'Название магазина',
    phone: '88005553535',
    image: SAFileModels.resFileDB,
  };

  static resStoreList = {
    id: 'UUID',
    store: 'Название магазина',
    image: SAFileModels.resFileDB,
    phone: '88005553535',
    countProducts: 24,
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
