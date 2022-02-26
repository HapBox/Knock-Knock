export default class APIRatingModels {
  static reqRatingCreate = {
    rating: 7.3,
    comment: 'Текстовый отзыв',
  };

  static resRatingStoreInfo = {
    name: 'Название магазина',
  }

  static resRatingInfo = {
    id: 'UUID',
    userName: 'Имя комментатора',
    store: APIRatingModels.resRatingStoreInfo,
    storeId: 'UUID',
    rating: 7.2,
    comment: 'Текстовый отзыв',
  };

  static resRatingInfoList = {
      ratingList: [APIRatingModels.resRatingInfo]
  }
}
