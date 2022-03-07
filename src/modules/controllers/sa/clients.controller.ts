import { NextFunction, Response } from 'express';
import { ApiController, GET, PATCH, POST } from '../../../core/api-decorators';
import { requireToken } from '../../../middlewares/require-token';
import BaseRequest from '../../base/base.request';
import SaClientsService from '../../services/sa/sa-clients.service';

@ApiController('/sa/api/clients')
class Controller {
  @GET('/', {
    summary: 'Получение списка всех клиентов',
    handlers: [requireToken],
  })
  async getClients(req: BaseRequest, res: Response, next: NextFunction) {
    let clientList = await SaClientsService.getClients();
    res.json(clientList);
  }

  @GET('/:id', {
    summary: 'Получение информации о клиенте по id',
    handlers: [requireToken],
  })
  async getClientById(req: BaseRequest, res: Response, next: NextFunction) {
    let clientId: string = req.params.id;
    let client = await SaClientsService.getClientById(clientId);
    res.json(client);
  }

  @PATCH('/:id/block', {
    summary: 'Блокировка клиента по id',
    handlers: [requireToken],
  })
  async blockClient(req: BaseRequest, res: Response, next: NextFunction) {
    let clientId: string = req.params.id;
    let client = await SaClientsService.blockCLient(clientId);
    res.json(client);
  }

  @PATCH('/:id/unblock', {
    summary: 'Разблокировка клиента по id',
    handlers: [requireToken],
  })
  async unblockClient(req: BaseRequest, res: Response, next: NextFunction) {
    let clientId: string = req.params.id;
    let client = await SaClientsService.unblockClient(clientId);
    res.json(client);
  }

  @PATCH('/:id', {
    summary: 'Обновление информации о клиенте по id',
    handlers: [requireToken],
  })
  async patchClient(req: BaseRequest, res: Response, next: NextFunction) {
    let clientId: string = req.params.id;
    let dto = req.body;
    let client = await SaClientsService.updateClient(clientId, dto);
    res.json(client);
  }
}

export default new Controller();
