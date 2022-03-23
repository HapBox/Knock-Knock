import { NextFunction, Response } from 'express';
import { ApiController, DELETE, GET, PATCH, POST } from '../../../core/api-decorators';
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
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfoList)],
  })
  async getAdmins(req: BaseRequest, res: Response, next: NextFunction) {
    let adminList = await SaAdminsService.getAdmins();
    res.json(adminList);
  }

  @GET('/:id', {
    summary: 'Получение информации о админе',
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfo)],
  })
  async getAdmin(req: BaseRequest, res: Response, next: NextFunction) {
    let adminId: string = req.params.id;
    let admin = await SaAdminsService.getAdminById(adminId);
    res.json(admin);
  }

  @PATCH('/:id', {
    summary: 'Обновление информации о админе по id',
    handlers: [requireToken, dtoValidator(UserUpdateDto)],
    body: SAUsersModels.reqAdminCreate,
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfo)],
  })
  async patchAdmin(req: BaseRequest, res: Response, next: NextFunction) {
    let dto = {
      ...req.body,
      adminId: req.params.id,
    };
    let admin = await SaAdminsService.updateAdmin(dto);
    res.json(admin);
  }

  @PATCH('/:id/block', {
    summary: 'Блокировка админа по id',
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfo)],
  })
  async blockAdmin(req: BaseRequest, res: Response, next: NextFunction) {
    let adminId: string = req.params.id;
    let admin = await SaAdminsService.blockAdmin(adminId);
    res.json(admin);
  }

  @PATCH('/:id/unblock', {
    summary: 'Разблокировка админа по id',
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfo)],
  })
  async unblockAdmin(req: BaseRequest, res: Response, next: NextFunction) {
    let adminId: string = req.params.id;
    let admin = await SaAdminsService.unblockAdmin(adminId);
    res.json(admin);
  }

  @POST('/', {
    summary: 'Создание администратора',
    handlers: [requireToken, dtoValidator(UserCreateDto)],
    body: SAUsersModels.reqAdminCreate,
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfo)],
  })
  async createAdmin(req: BaseRequest, res: Response, next: NextFunction) {
    let dto = req.body;
    let admin = await SaAdminsService.createAdmin(dto);
    res.json(admin);
  }

  @PATCH('/:id/dismiss', {
    summary: 'Увольнение админа (понижение в правах)',
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(SAUsersModels.resUserInfo)],
  })
  async dismissAdmin(req: BaseRequest, res: Response, next: NextFunction) {
    let adminId: string = req.params.id;
    let admin = await SaAdminsService.dismissAdmin(adminId);
    res.json(admin);
  }
}

export default new Controller();
