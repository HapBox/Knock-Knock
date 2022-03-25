import { NextFunction, Response } from 'express';
import { ApiController, DELETE, GET, POST } from '../../../core/api-decorators';
import { requireToken } from '../../../middlewares/require-token';
import { dtoValidator } from '../../../middlewares/validate';
import BaseRequest from '../../base/base.request';
import { CardCreateDto } from '../../dto/card-create.dto';
import { CardDeleteDto } from '../../dto/card-delete.dto';
import ApiCardsService from '../../services/api/api-cards.service';

@ApiController('/api/cards')
class Controller {
  @POST('/', {
    summary: 'Создание новой карты пользователя',
    handlers: [requireToken, dtoValidator(CardCreateDto)],
  })
  async createCard(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: CardCreateDto = { ...req.body, userId: req.userId };
    const result = await ApiCardsService.createCard(dto);
    res.json(result);
  }

  @GET('/', {
    summary: 'Получение списка карт',
    handlers: [requireToken],
  })
  async getCards(req: BaseRequest, res: Response, next: NextFunction) {
    const result = await ApiCardsService.getCards(req.userId);
    res.json(result);
  }

  @DELETE('/:id', {
    summary: 'Удаляет карту',
    handlers: [requireToken, dtoValidator(CardDeleteDto)],
  })
  async deleteCard(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: CardDeleteDto = {
      userId: req.userId,
      cardId: req.params.id,
    };
    const result = await ApiCardsService.deleteCard(dto);
    res.json(result);
  }
}

export default new Controller();
