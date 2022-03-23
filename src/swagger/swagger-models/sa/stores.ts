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

  static resStoreInfoList = {
    storeList: [SAStoresModels.resStoreInfo],
  };
}
