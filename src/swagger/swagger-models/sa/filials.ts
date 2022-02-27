import SAAddressesModels from './addresses';
import SAProductsModels from './products';

export default class SAFilialModels {
  static reqFilialCreate = {
    address: SAAddressesModels.resAddressInfo,
  };

  static resFilialShortInfo = {
    id: 'UUID',
    address: SAAddressesModels.resAddressInfo,
  };

  static resFilialInfoList = {
    filialList: [SAFilialModels.resFilialShortInfo],
  };

  static resFilialFullInfo = {
    id: 'UUID',
    address: SAAddressesModels.resAddressInfo,
    productList: [SAProductsModels.resProductInfoList],
  };
}
