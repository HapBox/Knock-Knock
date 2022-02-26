export default class APIStoresModels {
  static resStoreInfo = {
    id: 'UUID',
    name: 'Название магазина',
    phone: 'Телефон горячей линии магазина',
    //image
  };

  static resStoreInfoList = {
    storeList: [APIStoresModels.resStoreInfo],
  };
}
