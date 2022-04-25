import { NextFunction, Response } from 'express';
import { ApiController, GET, PATCH } from '../../../core/api-decorators';
import { requireAdmin } from '../../../middlewares/require-admin';
import { requireToken } from '../../../middlewares/require-token';
import { dtoValidator } from '../../../middlewares/validate';
import SAUsersModels from '../../../swagger/swagger-models/sa/users';
import SwaggerUtils from '../../../swagger/swagger-utils';
import BaseRequest from '../../base/base.request';
import { UserUpdateDto } from '../../dto/user-update.dto';
import SaClientsService from '../../services/sa/sa-clients.service';

@ApiController('/sa/api/clients')
class Controller {
  @GET('/', {
    summary: 'Получение списка всех клиентов',
    handlers: [requireToken, requireAdmin],
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfoList)],
  })
  async getClients(req: BaseRequest, res: Response, next: NextFunction) {
    const result = await SaClientsService.getClients();
    res.json(result);
  }

  @GET('/:id', {
    summary: 'Получение информации о клиенте по id',
    handlers: [requireToken, requireAdmin],
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfo)],
  })
  async getClientById(req: BaseRequest, res: Response, next: NextFunction) {
    const clientId: string = req.params.id;
    const result = await SaClientsService.getClientById(clientId);
    res.json(result);
  }

  @PATCH('/:id/block', {
    summary: 'Блокировка клиента по id',
    handlers: [requireToken, requireAdmin],
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfo)],
  })
  async blockClient(req: BaseRequest, res: Response, next: NextFunction) {
    const clientId: string = req.params.id;
    const result = await SaClientsService.blockCLient(clientId);
    res.json(result);
  }

  @PATCH('/:id/unblock', {
    summary: 'Разблокировка клиента по id',
    handlers: [requireToken, requireAdmin],
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfo)],
  })
  async unblockClient(req: BaseRequest, res: Response, next: NextFunction) {
    const clientId: string = req.params.id;
    const result = await SaClientsService.unblockClient(clientId);
    res.json(result);
  }

  @PATCH('/:id', {
    summary: 'Обновление информации о клиенте по id',
    handlers: [requireToken, requireAdmin, dtoValidator(UserUpdateDto)],
    body: SAUsersModels.reqUserCreate,
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfo)],
  })
  async patchClient(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: UserUpdateDto = {
      ...req.body,
      userId: req.params.id,
    };
    const result = await SaClientsService.updateClient(dto);
    res.json(result);
  }
}

export default new Controller();
