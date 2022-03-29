import { PaymentTypes } from '../../../utils/constants';
import SAAddressesModels from './addresses';
import SAStoresModels from './stores';

export default class SAOrderModels {
  static reqProductOrderCreate = {
    productId: 'UUID',
    count: 3,
  };

  static resProductOrderCreate = {
    productId: 'UUID',
    count: 3,
  };

  static reqOrderCreate = {
    userId: '',
    filialId: 'UUID',
    userAddress: SAAddressesModels.reqAddressCreate,
    payment: Object.values(PaymentTypes),
    dateTo: '27.02.2022',
    countPersons: 4,
    productList: [SAOrderModels.reqProductOrderCreate],
  };

  static resOrderInfo = {
    id: 'UUID',
    store: SAStoresModels.resStoreInfo,
    price: 'Цена',
    status: 'Статус',
    dateTo: '27.02.2022',
    countPersons: 4,
    productList: [SAOrderModels.resProductOrderCreate],
    address: SAAddressesModels.resAddressInfo
  };

  static resOrdersInfo = {
    orderList: [SAOrderModels.resOrderInfo],
  };
}
