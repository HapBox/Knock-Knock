export default class SAAddressesModels {
    static reqAddressCreate = {
      city: 'Город',
      street: 'Улица',
      house: 'Дом',
      entrance: 'Подъезд',
      floor: 'Этаж',
      apartment: 'Квартира',
      intercom: 'Код домофона',
    };
  
    static resAddressInfo = {
      id: 'UUID',
      city: 'Город',
      street: 'Улица',
      house: 'Дом',
      entrance: 'Подъезд',
      floor: 'Этаж',
      apartment: 'Квартира',
      intercom: 'Код домофона',
    };
  
    static resAddressInfoList = {
      addressList: [SAAddressesModels.resAddressInfo]
    };
  }
  