import SAProductsModels from "./products";

export default class SAStoresModels {
  static reqStoreCreate = {
    name: 'Название магазина',
    phone: '88005553535',
    //image
  };

  static resStoreInfo = {
    id: 'UUID',
    name: 'Название магазина',
    phone: '88005553535',
    //image
  };

  static resStoreFullInfo = {
    id: 'UUID',
    name: 'Название магазина',
    phone: '88005553535',
    //image
    productList: [SAProductsModels.resProductInfoList]
  }

  static resStoreInfoList = {
    storeList: [SAStoresModels.resStoreInfo],
  };
}
