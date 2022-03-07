import { NextFunction, Response } from 'express';
import { ApiController, DELETE, GET, PATCH, POST } from '../../../core/api-decorators';
import { requireToken } from '../../../middlewares/require-token';
import { dtoValidator } from '../../../middlewares/validate';
import BaseRequest from '../../base/base.request';
import { AddressCreateDto } from '../../dto/address-create.dto';
import { AddressUpdateDto } from '../../dto/address-update.dto';
import SaAddressesService from '../../services/sa/sa-addresses.service';

@ApiController('/sa/api/addresses')
class Controller {
  @GET('/', {
    summary: 'Получение списка адресов',
    handlers: [requireToken],
  })
  async getAddress(req: BaseRequest, res: Response, next: NextFunction) {
    let addressList = await SaAddressesService.getAddresses();
    res.json(addressList);
  }

  @GET('/:id', {
    summary: 'Получение адреса по id',
    handlers: [requireToken],
  })
  async getAddresById(req: BaseRequest, res: Response, next: NextFunction) {
    let addressId: string = req.params.id;
    let address = await SaAddressesService.getAddressById(addressId);
    res.json(address);
  }

  @POST('/', {
    summary: 'Создание адреса для магазина',
    handlers: [requireToken, dtoValidator(AddressCreateDto)],
  })
  async createAddress(req: BaseRequest, res: Response, next: NextFunction) {
    let dto = req.body;
    let address = await SaAddressesService.createAddress(dto);
    res.json(address);
  }

  @PATCH('/:id', {
    summary: 'Обновление информации адреса для магазина',
    handlers: [requireToken, dtoValidator(AddressUpdateDto)],
  })
  async patchAddress(req: BaseRequest, res: Response, next: NextFunction) {
    let dto = req.body;
    let addressId: string = req.params.id;
    let address = await SaAddressesService.patchAddress(addressId, dto);
    res.json(address);
  }

  @DELETE('/:id', {
    summary: 'Удаление адреса магазина',
    handlers: [requireToken],
  })
  async deleteAddress(req: BaseRequest, res: Response, next: NextFunction) {
    let addressId = req.params.id;
    await SaAddressesService.deleteAddress(addressId);
    res.json({ message: 'ok' });
  }
}

export default new Controller();
