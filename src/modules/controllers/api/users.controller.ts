import { NextFunction, Response } from 'express';
import { ApiController, GET, PATCH, POST } from '../../../core/api-decorators';
import { requireToken } from '../../../middlewares/require-token';
import { dtoValidator } from '../../../middlewares/validate';
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
  })
  async getUser(req: BaseRequest, res: Response, next: NextFunction) {
    const user = await ApiUsersService.getUser(req.userId);
    res.json(user);
  }

  @PATCH('/', {
    summary: 'Обновление информации о пользователе',
    handlers: [requireToken, dtoValidator(UserUpdateDto)],
  })
  async updateUser(req: BaseRequest, res: Response, next: NextFunction) {
    const dto = { ...req.body, userId: req.userId };
    const user = await ApiUsersService.updateUser(dto);
    res.json(user);
  }

  @GET('/me/reviews', {
    summary: 'Получение всех отзывов пользователя',
    handlers: [requireToken],
  })
  async getRating(req: BaseRequest, res: Response, next: NextFunction) {
    const reviews = await ApiUsersService.getUserRatingList(req.userId);
    res.json(reviews);
  }

  @POST('/me/addresses', {
    summary: 'Создание нового адреса пользователя',
    handlers: [requireToken, dtoValidator(AddressCreateDto)],
  })
  async createAddress(req: BaseRequest, res: Response, next: NextFunction) {
    const dto = { ...req.body, userId: req.userId };
    const address = await ApiUsersService.createAddress(dto);
    res.json(address);
  }

  @GET('/me/addresses', {
    summary: 'Получение списка адресов пользователя',
    handlers: [requireToken],
  })
  async getAddresses(req: BaseRequest, res: Response, next: NextFunction) {
    const addressList = await ApiUsersService.getAddressList(req.userId);
    res.json(addressList);
  }

  @PATCH('/me/addresses/:id', {
    summary: 'Обновление информации об адресе',
    handlers: [requireToken, dtoValidator(AddressUpdateDto)],
  })
  async updateAddress(req: BaseRequest, res: Response, next: NextFunction) {
    const dto = { ...req.body, userId: req.userId, addressId: req.params.id };
    const address = await ApiUsersService.updateAddress(dto);
    res.json(address);
  }
}

export default new Controller();
