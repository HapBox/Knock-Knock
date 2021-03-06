class RuntimeConst {}

class UrlConst extends RuntimeConst {
  static LOCALHOST_MASK: string = `localhost`; //маска localhost
  static LOCAL_URL: string = `http://${UrlConst.LOCALHOST_MASK}`; //Адрес локалХост

  static SWAGGER_DOC_MASK: string = `/swagger/docs`; //маска для swagger docs
  static MEDIA_FOLDER: string = `/media`; //Папка, где хранятся все документы
}

export class Constants extends UrlConst {
  static HEADER_X_ACCESS_TOKEN: string = 'x-access-token'; //Название HEADERS
  static TOKEN_LENGHT: number = 128; //Длина токена
  static SERVICE_NAME = 'SERVICE-NAME';
  static HEADER_ACCESS_TOKEN: string = 'accessToken'; //Название заголовка для - accessToken
}

export class ErrorReasons {
  static BAD_REQUEST: string = 'BAD_REQUEST';
  static NOT_FOUND: string = 'NOT_FOUND';
  static UNAUTHORIZED: string = 'UNAUTHORIZED';
  static SERVER_ERROR: string = 'SERVER_ERROR';
}

export enum FileTypes {
  IMAGE = 'IMAGE',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
  DOCUMENT = 'DOCUMENT',
}

export enum ENVTypes {
  DEV = 'dev',
  DEV_STAND = 'dev_stand',
  PROD = 'prod',
  PROD_STAND = 'prod_stand',
  TEST = 'test',
}

export enum StatusTypes {
  PROCESSING = 'PROCESSING', //В процессе
  PREPARING = 'PREPARING', //Готовка
  CANCELED = 'CANCELED', //Отменено
  DELIVERING = 'DELIVERING', //Доставляется
  READY = 'READY', //Готово
}

export enum PaymentTypes {
  CARD = 'CARD', //Картой
  CASH = 'CASH', //Наличкой
}

export enum RoleTypes {
  USER = 'USER', //Обычный пользователь
  ADMIN = 'ADMIN', //Администратор
  STOREWORKER = 'STOREWORKER', //Администратор магазина
}
