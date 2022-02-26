export default class APICardsModels {
  static reqCardCreate = {
    userId: 'UUID',
    number: 'Номер карты',
    date: 'Дата',
    cvv: 'CVV код',
  };

  static resCardInfo = {
    cardId: 'UUID',
    userId: 'UUID',
    number: 'Номер карты',
    date: 'Дата',
    cvv: 'CVV код',
  };

  static resCardInfoList = {
    cardList: [APICardsModels.resCardInfo]
  }
}
