export default class APICardsModels {
  static reqCardCreate = {
    number: 'Номер карты',
    date: 'Дата',
    cvv: 'CVV код',
  };

  static resCardInfo = {
    cardId: 'UUID',
    number: 'Номер карты',
    date: 'Дата',
    cvv: 'CVV код',
  };

  static resCardInfoList = {
    cardList: [APICardsModels.resCardInfo]
  }
}
