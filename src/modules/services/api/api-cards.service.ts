import Card from '../../../database/models/final/card.model';
import { throwError } from '../../../utils/http-exception';
import { CardCreateDto } from '../../dto/card-create.dto';

export default class ApiCardsService {
  static async getCards(userId: string) {
    const cardList = await Card.findAll({
      where: {
        userId: userId,
        isExist: true,
      },
    });
    return cardList;
  }

  static async createCard(dto: CardCreateDto) {
    const card = await Card.create(dto);
    return card;
  }

  static async deleteCard(cardId: string, userId: string) {
    const card = await Card.findOne({
      where: {
        userId: userId,
        id: cardId,
        isExist: true,
      },
    });
    if (!card) {
      throwError({
        statusCode: 404,
        message: 'Not found.',
      });
    }
    return await card.update({isExist: false});
  }
}
