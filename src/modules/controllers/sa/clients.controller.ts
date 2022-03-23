import { NextFunction, Response } from 'express';
import { ApiController, GET, PATCH, POST } from '../../../core/api-decorators';
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
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfoList)],
  })
  async getClients(req: BaseRequest, res: Response, next: NextFunction) {
    let clientList = await SaClientsService.getClients();
    res.json(clientList);
  }

  @GET('/:id', {
    summary: 'Получение информации о клиенте по id',
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfo)],
  })
  async getClientById(req: BaseRequest, res: Response, next: NextFunction) {
    let clientId: string = req.params.id;
    let client = await SaClientsService.getClientById(clientId);
    res.json(client);
  }

  @PATCH('/:id/block', {
    summary: 'Блокировка клиента по id',
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfo)],
  })
  async blockClient(req: BaseRequest, res: Response, next: NextFunction) {
    let clientId: string = req.params.id;
    let client = await SaClientsService.blockCLient(clientId);
    res.json(client);
  }

  @PATCH('/:id/unblock', {
    summary: 'Разблокировка клиента по id',
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfo)],
  })
  async unblockClient(req: BaseRequest, res: Response, next: NextFunction) {
    let clientId: string = req.params.id;
    let client = await SaClientsService.unblockClient(clientId);
    res.json(client);
  }

  @PATCH('/:id', {
    summary: 'Обновление информации о клиенте по id',
    handlers: [requireToken, dtoValidator(UserUpdateDto)],
    body: SAUsersModels.reqUserCreate,
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfo)],
  })
  async patchClient(req: BaseRequest, res: Response, next: NextFunction) {
    let dto = { ...req.body, clientId: req.params.id };
    let client = await SaClientsService.updateClient(dto);
    res.json(client);
  }
}

export default new Controller();
