import { FileTypes } from "../../../utils/constants";
import APIProductsModels from "./products";

export default class APIStoresModels {
  static resFile = {
    id: 'UUID',
    extension: 'jpg,png...',
    size: 1234,
    originalName: 'картинка1234.jpg',
    type: Object.values(FileTypes).join('/'),
    url: 'https://....',
  };

  static resStoreInfo = {
    id: 'UUID',
    name: 'Название магазина',
    phone: 'Телефон горячей линии магазина',
    image: APIStoresModels.resFile,
  };

  static resStoreFullInfo = {
    id: 'UUID',
    name: 'Название магазина',
    phone: '88005553535',
    image: APIStoresModels.resFile,
    productList: [APIProductsModels.resProductInfoList]
  }

  static resStoreInfoList = {
    storeList: [APIStoresModels.resStoreInfo],
  };
}
