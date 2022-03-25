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
    const dto: AddressCreateDto = {
      ...req.body,
    };
    const result = await SaAddressesService.createAddress(dto);
    res.json(result);
  }

  @PATCH('/:id', {
    summary: 'Обновление информации адреса для магазина',
    handlers: [requireToken, dtoValidator(AddressUpdateDto)],
    body: SAAddressesModels.reqAddressCreate,
    responses: [SwaggerUtils.body200(SAAddressesModels.resAddressInfo)],
  })
  async patchAddress(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: AddressUpdateDto = {
      ...req.body,
      addressId: req.params.id,
    };
    const result = await SaAddressesService.patchAddress(dto);
    res.json(result);
  }

  @DELETE('/:id', {
    summary: 'Удаление адреса магазина',
    handlers: [requireToken],
  })
  async deleteAddress(req: BaseRequest, res: Response, next: NextFunction) {
    const addressId = req.params.id;
    const result = await SaAddressesService.deleteAddress(addressId);
    res.json(result);
  }
}

export default new Controller();
