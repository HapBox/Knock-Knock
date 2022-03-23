import { NextFunction, Response } from 'express';
import { ApiController, DELETE, GET, PATCH, POST } from '../../../core/api-decorators';
import { requireToken } from '../../../middlewares/require-token';
import { dtoValidator } from '../../../middlewares/validate';
import SAAddressesModels from '../../../swagger/swagger-models/sa/addresses';
import SwaggerUtils from '../../../swagger/swagger-utils';
import BaseRequest from '../../base/base.request';
import { AddressCreateDto } from '../../dto/address-create.dto';
import { AddressUpdateDto } from '../../dto/address-update.dto';
import SaAddressesService from '../../services/sa/sa-addresses.service';

//сделать так для филиалов
@ApiController('/sa/api/addresses')
class Controller {
  @POST('/', {
    summary: 'Создание адреса для магазина',
    handlers: [requireToken, dtoValidator(AddressCreateDto)],
    body: SAAddressesModels.reqAddressCreate,
    responses: [SwaggerUtils.body200(SAAddressesModels.resAddressInfo)],
  })
  async createAddress(req: BaseRequest, res: Response, next: NextFunction) {
    let dto = req.body;
    let address = await SaAddressesService.createAddress(dto);
    res.json(address);
  }

  @PATCH('/:id', {
    summary: 'Обновление информации адреса для магазина',
    handlers: [requireToken, dtoValidator(AddressUpdateDto)],
    body: SAAddressesModels.reqAddressCreate,
    responses: [SwaggerUtils.body200(SAAddressesModels.resAddressInfo)],
  })
  async patchAddress(req: BaseRequest, res: Response, next: NextFunction) {
    let dto = { ...req.body, addressId: req.params.id };
    let address = await SaAddressesService.patchAddress(dto);
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
