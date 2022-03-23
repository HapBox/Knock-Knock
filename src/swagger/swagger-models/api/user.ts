export default class APIUserModels {
  static reqUserCreateUpdate = {
    phone: 'Номер телефона',
    firstName: 'Имя',
    lastName: 'Фамилия',
    'workStoreId?': 'UUID',
  };

  static resUserInfo = {
    id: 'UUID',
    phone: 'Номер телефона',
    firstName: 'Имя',
    lastName: 'Фамилия',
  };
}
