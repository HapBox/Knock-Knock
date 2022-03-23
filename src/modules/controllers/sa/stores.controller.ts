import { NextFunction, Response } from 'express';
import { ApiController, DELETE, GET, PATCH, POST } from '../../../core/api-decorators';
import { requireToken } from '../../../middlewares/require-token';
import { dtoValidator } from '../../../middlewares/validate';
import SAFilialModels from '../../../swagger/swagger-models/sa/filials';
import SAStoresModels from '../../../swagger/swagger-models/sa/stores';
import SAUsersModels from '../../../swagger/swagger-models/sa/users';
import SwaggerUtils from '../../../swagger/swagger-utils';
import BaseRequest from '../../base/base.request';
import { AddressUpdateDto } from '../../dto/address-update.dto';
import { FilialCreateDto } from '../../dto/filial-create.dto';
import { StoreUpdateDto } from '../../dto/store-update.dto';
import SaStoresService from '../../services/sa/sa-stores.service';

@ApiController('/sa/api/stores')
class Controller {
  @GET('/', {
    summary: 'Получение списка магазинов',
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(SAStoresModels.resStoreInfoList)],
  })
  async getStores(req: BaseRequest, res: Response, next: NextFunction) {
    let storeList = await SaStoresService.getStores();
    res.json(storeList);
  }

  @GET('/:id', {
    summary: 'Получение информации о магазине по id',
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(SAStoresModels.resStoreInfo)],
  })
  async getStoreById(req: BaseRequest, res: Response, next: NextFunction) {
    let storeId = req.params.id;
    let store = await SaStoresService.getStoreById(storeId);
    res.json({ message: 'ok' });
  }

  @DELETE('/:id', {
    summary: 'Удалить магазин по id',
    handlers: [requireToken],
  })
  async deleteStoreById(req: BaseRequest, res: Response, next: NextFunction) {
    let storeId = req.params.id;
    await SaStoresService.deleteStoreById(storeId);
    res.json({ message: 'Store deleted' });
  }

  @PATCH('/:id', {
    summary: 'Обновить информацию о магазине по id',
    handlers: [requireToken, dtoValidator(StoreUpdateDto)],
    body: SAStoresModels.reqStoreCreate,
    responses: [SwaggerUtils.body200(SAStoresModels.resStoreInfo)],
  })
  async patchStoreById(req: BaseRequest, res: Response, next: NextFunction) {
    let dto = { ...req.body, storeId: req.params.id };
    let store = await SaStoresService.updateStoreById(dto);
    res.json(store);
  }

  @GET('/:id/filials', {
    summary: 'Получение списка филиалов магазина',
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(SAFilialModels.resFilialInfoList)],
  })
  async getStoreFilials(req: BaseRequest, res: Response, next: NextFunction) {
    let storeId = req.params.id;
    let filialList = await SaStoresService.getStoreFilials(storeId);
    res.json(filialList);
  }

  @POST('/:id/filials', {
    summary: 'Создание филиала магазина',
    handlers: [requireToken, dtoValidator(FilialCreateDto)],
    body: SAFilialModels.reqFilialCreate,
    responses: [SwaggerUtils.body200(SAFilialModels.resFilialShortInfo)],
  })
  async createStoreFilials(req: BaseRequest, res: Response, next: NextFunction) {
    let dto: FilialCreateDto = { ...req.body, storeId: req.params.id };
    let filial = await SaStoresService.createStoreFilial(dto);
    res.json(filial);
  }

  @PATCH('/:storeId/filials/:filialId', {
    summary: 'Обновление информации филиала магазина',
    handlers: [requireToken, dtoValidator(AddressUpdateDto)],
    body: SAFilialModels.reqFilialCreate,
    responses: [SwaggerUtils.body200(SAFilialModels.resFilialShortInfo)],
  })
  async patchStoreFilial(req: BaseRequest, res: Response, next: NextFunction) {
    let storeId = req.params.id;
    let filialId = req.params.filialId;
    let dto = req.body;
    let filial = await SaStoresService.updateStoreFilial(storeId, filialId, dto);// переделать с дто
    res.json(filial);
  }

  @DELETE('/:storeId/filials/:filialId', {
    summary: 'Удаление филиала магазина',
    handlers: [requireToken],
  })
  async deleteStoreFilial(req: BaseRequest, res: Response, next: NextFunction) {
    let storeId = req.params.id;
    let filialId = req.params.filialId;
    await SaStoresService.deleteStoreFilial(storeId, filialId);
    res.json({ message: 'Deleted filial' });
  }

  @PATCH('/:storeId/workers/:workerId/add', {
    summary: 'Добавление администратора магазина',
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfo)],
  })
  async addWorker(req: BaseRequest, res: Response, next: NextFunction) {
    let storeId = req.params.id;
    let workerId = req.params.workerId;
    let worker = await SaStoresService.addWorker(storeId, workerId);
    res.json(worker);
  }

  @PATCH('/:storeId/workers/:workerId/remove', {
    summary: 'Удаление администратора магазина',
    handlers: [requireToken],
  })
  async removeWorker(req: BaseRequest, res: Response, next: NextFunction) {
    let storeId = req.params.id;
    let workerId = req.params.workerId;
    await SaStoresService.removeWorker(storeId, workerId);
    res.json({ message: 'Worker deleted' }); // перекинуть в сервис
  }
}

export default new Controller();
