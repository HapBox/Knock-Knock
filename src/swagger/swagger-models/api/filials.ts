import APIAddressesModels from "./addresses";

export default class APIFilialModels {
    static resFilialShortInfo = {
      id: 'UUID',
      address: APIAddressesModels.resAddressInfo
    };
  
    static resFilialInfoList = {
      filialList: [APIFilialModels.resFilialShortInfo],
    };

    static resFilialFullInfo ={
        id: 'UUID',
      address: APIAddressesModels.resAddressInfo,
      
    }
  }
  