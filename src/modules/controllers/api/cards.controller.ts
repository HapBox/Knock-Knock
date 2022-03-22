import { NextFunction, Response } from 'express';
import { ApiController, DELETE, GET, PATCH, POST } from '../../../core/api-decorators';
import { requireToken } from '../../../middlewares/require-token';
import { dtoValidator } from '../../../middlewares/validate';
import BaseRequest from '../../base/base.request';
import { CardCreateDto } from '../../dto/card-create.dto';
import ApiCardsService from '../../services/api/api-cards.service';

@ApiController('/api/cards')
class Controller {
  @POST('/', {
    summary: 'Создание новой карты пользователя',
    handlers: [requireToken, dtoValidator(CardCreateDto)],
  })
  async createCard(req: BaseRequest, res: Response, next: NextFunction) {
    const dto = { ...req.body, userId: req.userId };
    const card = await ApiCardsService.createCard(dto);
    res.json(card);
  }

  @GET('/', {
    summary: 'Получение списка карт',
    handlers: [requireToken],
  })
  async getCards(req: BaseRequest, res: Response, next: NextFunction) {
    const cardList = await ApiCardsService.getCards(req.userId);
    res.json(cardList);
  }

  @DELETE('/:id', {
    summary: 'Удаляет карту',
    handlers: [requireToken],
  })
  async deleteCard(req: BaseRequest, res: Response, next: NextFunction) {
    await ApiCardsService.deleteCard(req.params.id, req.userId);
    res.json({ message: 'succesfull' });
  }
}

export default new Controller();
