export default class SAUsersModels {
  static reqUserCreate = {
    phone: '89687309110',
    'firstName?': 'Имя',
    'lastName?': 'Фамилия',
  }

  static reqAdminCreate = {
    phone: '89687309110',
    firstName: 'Имя',
    lastName: 'Фамилия',
  }

  static resUserInfo = {
    id: 'UUID',
    phone: '89687309110',
    firstName: 'Имя',
    lastName: 'Фамилия',
    isBlocked: false,
  };

  static resUserInfoList = {
    userList: [SAUsersModels.resUserInfo],
  };
}
