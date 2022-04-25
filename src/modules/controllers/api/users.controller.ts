import { NextFunction, Response } from 'express';
import { ApiController, GET, PATCH, POST } from '../../../core/api-decorators';
import { requireToken } from '../../../middlewares/require-token';
import { dtoValidator } from '../../../middlewares/validate';
import APIAddressesModels from '../../../swagger/swagger-models/api/addresses';
import APIRatingModels from '../../../swagger/swagger-models/api/ratings';
import APIUserModels from '../../../swagger/swagger-models/api/user';
import SwaggerUtils from '../../../swagger/swagger-utils';
import BaseRequest from '../../base/base.request';
import { AddressCreateDto } from '../../dto/address-create.dto';
import { AddressUpdateDto } from '../../dto/address-update.dto';
import { UserUpdateDto } from '../../dto/user-update.dto';
import ApiUsersService from '../../services/api/api-users.service';

@ApiController('/api/users')
class Controller {
  @GET('/me', {
    summary: 'Получение информациии о пользователе',
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(APIUserModels.resUserInfo)],
  })
  async getUser(req: BaseRequest, res: Response, next: NextFunction) {
    const result = await ApiUsersService.getUser(req.userId);
    res.json(result);
  }

  @PATCH('/', {
    summary: 'Обновление информации о пользователе',
    handlers: [requireToken, dtoValidator(UserUpdateDto)],
    body: APIUserModels.reqUserCreateUpdate,
    responses: [SwaggerUtils.body200(APIUserModels.resUserInfo)],
  })
  async updateUser(req: BaseRequest, res: Response, next: NextFunction) {
    const dto = {
      ...req.body,
      userId: req.userId,
    };
    const result = await ApiUsersService.updateUser(dto);
    res.json(result);
  }

  @GET('/me/reviews', {
    summary: 'Получение всех отзывов пользователя',
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(APIRatingModels.resRatingInfoList)],
  })
  async getRating(req: BaseRequest, res: Response, next: NextFunction) {
    const result = await ApiUsersService.getUserRatingList(req.userId);
    res.json(result);
  }

  @POST('/me/addresses', {
    summary: 'Создание нового адреса пользователя',
    handlers: [requireToken, dtoValidator(AddressCreateDto)],
    body: APIAddressesModels.reqAddressCreate,
    responses: [SwaggerUtils.body200(APIAddressesModels.resAddressInfo)],
  })
  async createAddress(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: AddressCreateDto = {
      ...req.body,
      userId: req.userId,
    };
    const result = await ApiUsersService.createAddress(dto);
    res.json(result);
  }

  @GET('/me/addresses', {
    summary: 'Получение списка адресов пользователя',
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(APIAddressesModels.resAddressInfoList)],
  })
  async getAddresses(req: BaseRequest, res: Response, next: NextFunction) {
    const result = await ApiUsersService.getAddressList(req.userId);
    res.json(result);
  }

  @PATCH('/me/addresses/:id', {
    summary: 'Обновление информации об адресе',
    handlers: [requireToken, dtoValidator(AddressUpdateDto)],
    body: APIAddressesModels.reqAddressCreate,
    responses: [SwaggerUtils.body200(APIAddressesModels.resAddressInfo)],
  })
  async updateAddress(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: AddressUpdateDto = {
      ...req.body,
      userId: req.userId,
      addressId: req.params.id,
    };
    const result = await ApiUsersService.updateAddress(dto);
    res.json(result);
  }
}

export default new Controller();
