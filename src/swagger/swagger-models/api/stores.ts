import APIProductsModels from "./products";

export default class APIStoresModels {
  static resStoreInfo = {
    id: 'UUID',
    name: 'Название магазина',
    phone: 'Телефон горячей линии магазина',
    //image
  };

  static resStoreFullInfo = {
    id: 'UUID',
    name: 'Название магазина',
    phone: '88005553535',
    //image
    productList: [APIProductsModels.resProductInfoList]
  }

  static resStoreInfoList = {
    storeList: [APIStoresModels.resStoreInfo],
  };
}
