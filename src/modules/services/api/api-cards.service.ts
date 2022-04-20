import Card from '../../../database/models/final/card.model';
import { throwError } from '../../../utils/http-exception';
import { CardCreateDto } from '../../dto/card-create.dto';
import { CardDeleteDto } from '../../dto/card-delete.dto';

export default class ApiCardsService {
  static async getCards(userId: string) {
    const cardList = await Card.findAll({
      where: {
        userId: userId,
        isExist: true,
      },
      attributes: ['id', 'number', 'date', 'cvv'],
    });
    return { cardList: cardList };
  }

  static async createCard(dto: CardCreateDto) {
    const card = await Card.create(dto);
    return card;
  }

  static async deleteCard(dto: CardDeleteDto) {
    const card = await Card.findOne({
      where: {
        userId: dto.userId,
        id: dto.cardId,
        isExist: true,
      },
    });
    if (!card) {
      throwError({
        statusCode: 404,
        message: 'Not found.',
      });
    }
    await card.update({ isExist: false });
    return { message: 'Delete succesfull' };
  }
}
