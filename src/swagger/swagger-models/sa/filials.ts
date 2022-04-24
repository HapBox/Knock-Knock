import SAAddressesModels from './addresses';

export default class SAFilialModels {
  static reqFilialCreate = {
    address: SAAddressesModels.reqAddressCreate,
  };

  static resFilialShortInfo = {
    id: 'UUID',
    address: SAAddressesModels.resAddressInfo,
  };

  static resFilialInfoList = {
    filialList: [SAFilialModels.resFilialShortInfo],
  };
}
