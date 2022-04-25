import { NextFunction, Response } from 'express';
import { ApiController, GET, PATCH, POST } from '../../../core/api-decorators';
import { requireAdmin } from '../../../middlewares/require-admin';
import { requireToken } from '../../../middlewares/require-token';
import { dtoValidator } from '../../../middlewares/validate';
import SAUsersModels from '../../../swagger/swagger-models/sa/users';
import SwaggerUtils from '../../../swagger/swagger-utils';
import BaseRequest from '../../base/base.request';
import { UserCreateDto } from '../../dto/user-create.dto';
import { UserUpdateDto } from '../../dto/user-update.dto';
import SaAdminsService from '../../services/sa/sa-admins.service';

@ApiController('/sa/api/admins')
class Controller {
  @GET('/', {
    summary: 'Получение списка всех админов',
    handlers: [requireToken, requireAdmin],
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfoList)],
  })
  async getAdmins(req: BaseRequest, res: Response, next: NextFunction) {
    const result = await SaAdminsService.getAdmins();
    res.json(result);
  }

  @GET('/:id', {
    summary: 'Получение информации о админе',
    handlers: [requireToken, requireAdmin],
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfo)],
  })
  async getAdmin(req: BaseRequest, res: Response, next: NextFunction) {
    const adminId: string = req.params.id;
    const result = await SaAdminsService.getAdminById(adminId);
    res.json(result);
  }

  @PATCH('/:id', {
    summary: 'Обновление информации о админе по id',
    handlers: [requireToken, requireAdmin, dtoValidator(UserUpdateDto)],
    body: SAUsersModels.reqAdminCreate,
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfo)],
  })
  async patchAdmin(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: UserUpdateDto = {
      ...req.body,
      userId: req.params.id,
    };
    const result = await SaAdminsService.updateAdmin(dto);
    res.json(result);
  }

  @PATCH('/:id/block', {
    summary: 'Блокировка админа по id',
    handlers: [requireToken, requireAdmin],
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfo)],
  })
  async blockAdmin(req: BaseRequest, res: Response, next: NextFunction) {
    const adminId = req.params.id;
    const result = await SaAdminsService.blockAdmin(adminId);
    res.json(result);
  }

  @PATCH('/:id/unblock', {
    summary: 'Разблокировка админа по id',
    handlers: [requireToken, requireAdmin],
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfo)],
  })
  async unblockAdmin(req: BaseRequest, res: Response, next: NextFunction) {
    const adminId: string = req.params.id;
    const result = await SaAdminsService.unblockAdmin(adminId);
    res.json(result);
  }

  @POST('/', {
    summary: 'Создание администратора',
    handlers: [requireToken, requireAdmin, dtoValidator(UserCreateDto)],
    body: SAUsersModels.reqAdminCreate,
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfo)],
  })
  async createAdmin(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: UserCreateDto = req.body;
    const result = await SaAdminsService.createAdmin(dto);
    res.json(result);
  }

  @PATCH('/:id/dismiss', {
    summary: 'Увольнение админа (понижение в правах)',
    handlers: [requireToken, requireAdmin],
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfo)],
  })
  async dismissAdmin(req: BaseRequest, res: Response, next: NextFunction) {
    const adminId: string = req.params.id;
    const result = await SaAdminsService.dismissAdmin(adminId);
    res.json(result);
  }
}

export default new Controller();
