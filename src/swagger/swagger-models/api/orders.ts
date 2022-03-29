import { PaymentTypes } from "../../../utils/constants";
import APIAddressesModels from "./addresses";
import APIStoresModels from "./stores";

export default class APIOrderModels {
  static reqProductOrderCreate = {
    productId: 'UUID',
    count: 3,
  };

  static resProductOrderCreate = {
    productId: 'UUID',
    count: 3,
  };

  static reqOrderCreate = {
    filialId: 'UUID',
    userAddress: APIAddressesModels.reqAddressCreate,
    payment: Object.values(PaymentTypes),
    'cardId?': 'UUID',
    dateTo: '27.02.2022',
    countPersons: 4,
    productList: [APIOrderModels.reqProductOrderCreate],
  };

  static resOrderInfo = {
    id: 'UUID',
    store: APIStoresModels.resStoreInfo,
    price: 5236,
    status: 'Статус',
    dateTo: '21.03.2022',
    countPersons: 4,
    productList: [APIOrderModels.resProductOrderCreate],
    address: APIAddressesModels.resAddressInfo
  };

  static resOrderInfoList = {
    orderList: [APIOrderModels.resOrderInfo],
  };
}
