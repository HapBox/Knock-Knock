import SAAddressesModels from './addresses';

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
}
