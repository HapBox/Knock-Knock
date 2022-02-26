import { PaymentTypes } from "../../../utils/constants";
import APIAddressesModels from "./addresses";
import APIStoresModels from "./stores";

export default class APIOrderModels {
  static reqProductOrderInfo = {
    productId: 'UUID',
    count: 3,
  };

  static reqOrderCreate = {
    filialId: 'UUID',
    userAddress: APIAddressesModels.reqAddressCreate,
    payment: Object.values(PaymentTypes),
    cardId: 'id карты',
    dateTo: '27.02.2022',
    productList: [APIOrderModels.reqProductOrderInfo],
  };

  static resOrderInfo = {
    id: 'UUID',
    store: APIStoresModels.resStoreInfo,
    price: 'Цена',
    status: 'Статус',
    dateTo: 'На какое время заказ',
    productList: [APIOrderModels.reqProductOrderInfo],
    address: APIAddressesModels.resAddressInfo
  };

  static resOrdersInfo = {
    orderList: [APIOrderModels.resOrderInfo],
  };
}
