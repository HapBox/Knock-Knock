import { NextFunction, Response } from 'express';
import { ApiController, DELETE, GET, PATCH, POST } from '../../../core/api-decorators';
import { requireRole } from '../../../middlewares/require-role';
import { requireToken } from '../../../middlewares/require-token';
import { dtoValidator } from '../../../middlewares/validate';
import SAFilialModels from '../../../swagger/swagger-models/sa/filials';
import SAStoresModels from '../../../swagger/swagger-models/sa/stores';
import SAUsersModels from '../../../swagger/swagger-models/sa/users';
import SwaggerUtils from '../../../swagger/swagger-utils';
import { BaseDto } from '../../base/base.dto';
import BaseRequest from '../../base/base.request';
import { FilialCreateDto } from '../../dto/filial-create.dto';
import { FilialUpdateDto } from '../../dto/filial-update.dto';
import { StoreCreateDto } from '../../dto/store-create.dto';
import { StoreGetDeleteOneDto } from '../../dto/store-get-delete-one.dto';
import { StoreUpdateDto } from '../../dto/store-update.dto';
import { StoreFilialDeleteDto } from '../../dto/storeFilial-delete.dto';
import { StoreWorkerAddDto } from '../../dto/storeWorker-add.dto';
import { StoreWorkerDeleteDto } from '../../dto/storeWorker-delete.dto';
import SaStoresService from '../../services/sa/sa-stores.service';

@ApiController('/sa/api/stores')
class Controller {
  @GET('/', {
    summary: 'Получение списка магазинов и количества их продуктов',
    handlers: [requireToken, requireRole],
    responses: [SwaggerUtils.body200(SAStoresModels.resStoreInfoList)],
  })
  async getStores(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: BaseDto = {
      userRole: req.userRole,
      workStoreId: req.workStoreId,
    };
    const result = await SaStoresService.getStores(dto);
    res.json(result);
  }

  @POST('/', {
    summary: 'Создание магазина',
    handlers: [requireToken, requireRole, dtoValidator(StoreCreateDto)],
    body: SAStoresModels.reqStoreCreate,
    responses: [SwaggerUtils.body200(SAStoresModels.resStoreInfo)],
  })
  async createStore(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: StoreCreateDto = req.body;
    dto.userRole = req.userRole;
    const result = await SaStoresService.createStore(dto);
    res.json(result);
  }

  @GET('/:id', {
    summary: 'Получение информации о магазине и списка продуктов по id',
    handlers: [requireToken, requireRole],
    responses: [SwaggerUtils.body200(SAStoresModels.resStoreInfo)],
  })
  async getStoreById(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: StoreGetDeleteOneDto = {
      userRole: req.userRole,
      workStoreId: req.workStoreId,
      storeId: req.params.id,
    };
    const result = await SaStoresService.getStoreById(dto);
    res.json(result);
  }

  @DELETE('/:id', {
    summary: 'Удалить магазин по id',
    handlers: [requireToken, requireRole],
  })
  async deleteStoreById(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: StoreGetDeleteOneDto = {
      storeId: req.params.id,
      userRole: req.userRole,
      workStoreId: req.workStoreId,
    };
    const result = await SaStoresService.deleteStoreById(dto);
    res.json(result);
  }

  @PATCH('/:id', {
    summary: 'Обновить информацию о магазине по id',
    handlers: [requireToken, requireRole, dtoValidator(StoreUpdateDto)],
    body: SAStoresModels.reqStoreCreate,
    responses: [SwaggerUtils.body200(SAStoresModels.resStoreInfo)],
  })
  async patchStoreById(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: StoreUpdateDto = {
      ...req.body,
      storeId: req.params.id,
      userRole: req.userRole,
      workStoreId: req.workStoreId,
    };
    const store = await SaStoresService.updateStoreById(dto);
    res.json(store);
  }

  @GET('/:id/filials', {
    summary: 'Получение списка филиалов магазина',
    handlers: [requireToken, requireRole],
    responses: [SwaggerUtils.body200(SAFilialModels.resFilialInfoList)],
  })
  async getStoreFilials(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: StoreGetDeleteOneDto = {
      storeId: req.params.id,
      userRole: req.userRole,
      workStoreId: req.workStoreId,
    };
    const filialList = await SaStoresService.getStoreFilials(dto);
    res.json(filialList);
  }

  @POST('/:id/filials', {
    summary: 'Создание филиала магазина',
    handlers: [requireToken, requireRole, dtoValidator(FilialCreateDto)],
    body: SAFilialModels.reqFilialCreate,
    responses: [SwaggerUtils.body200(SAFilialModels.resFilialShortInfo)],
  })
  async createStoreFilials(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: FilialCreateDto = {
      ...req.body,
      storeId: req.params.id,
      userRole: req.userRole,
      workStoreId: req.workStoreId,
    };
    const result = await SaStoresService.createStoreFilial(dto);
    res.json(result);
  }

  @PATCH('/:storeId/filials/:filialId', {
    summary: 'Обновление информации филиала магазина',
    handlers: [requireToken, requireRole, dtoValidator(FilialUpdateDto)],
    body: SAFilialModels.reqFilialCreate,
    responses: [SwaggerUtils.body200(SAFilialModels.resFilialShortInfo)],
  })
  async patchStoreFilial(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: FilialUpdateDto = {
      ...req.body,
      storeId: req.params.id,
      filialId: req.params.filialId,
      userRole: req.userRole,
      workStoreId: req.workStoreId,
    };
    const result = await SaStoresService.updateStoreFilial(dto);
    res.json(result);
  }

  @DELETE('/:storeId/filials/:filialId', {
    summary: 'Удаление филиала магазина',
    handlers: [requireToken, requireRole, dtoValidator(StoreFilialDeleteDto)],
  })
  async deleteStoreFilial(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: StoreFilialDeleteDto = {
      filialId: req.params.filialId,
      storeId: req.params.id,
      userRole: req.userRole,
      workStoreId: req.workStoreId,
    };
    const result = await SaStoresService.deleteStoreFilial(dto);
    res.json(result);
  }

  @PATCH('/:storeId/workers/:workerPhone/add', {
    summary: 'Добавление администратора магазина',
    handlers: [requireToken, requireRole, dtoValidator(StoreWorkerAddDto)],
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfo)],
  })
  async addWorker(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: StoreWorkerAddDto = {
      storeId: req.params.id,
      workerPhone: req.params.workerPhone,
      userRole: req.userRole,
    };
    const result = await SaStoresService.addWorker(dto);
    res.json(result);
  }

  @PATCH('/:storeId/workers/:workerId/remove', {
    summary: 'Удаление администратора магазина',
    handlers: [requireToken, requireRole, dtoValidator(StoreWorkerDeleteDto)],
  })
  async removeWorker(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: StoreWorkerDeleteDto = {
      storeId: req.params.id,
      workerId: req.params.workerId,
      userRole: req.userRole,
    };
    const result = await SaStoresService.removeWorker(dto);
    res.json(result);
  }
}

export default new Controller();
