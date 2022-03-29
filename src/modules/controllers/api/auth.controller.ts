import { NextFunction, Response } from 'express';
import { ApiController, GET, POST } from '../../../core/api-decorators';
import { requireToken } from '../../../middlewares/require-token';
import { dtoValidator } from '../../../middlewares/validate';
import APIAuthModels from '../../../swagger/swagger-models/api/auth';
import SwaggerUtils from '../../../swagger/swagger-utils';
import BaseRequest from '../../base/base.request';
import { PhoneAuthDto } from '../../dto/phone-auth.dto';
import { PhoneConfirmDto } from '../../dto/phone-confirm.dto';
import AuthService from '../../services/auth.service';

@ApiController('/api/auth')
class Controller {
  @POST('/phone', {
    summary: 'Авторизация по номеру телефона (начало)',
    handlers: [dtoValidator(PhoneAuthDto)],
    body: APIAuthModels.reqPhoneAuth,
  })
  async phoneAuthStart(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: PhoneAuthDto = req.body;
    const result = await AuthService.phoneLoginStart(dto);
    res.json(result);
  }

  @POST('/phone/confirm', {
    summary: 'Авторизация по номеру телефона (завершение)',
    handlers: [dtoValidator(PhoneConfirmDto)],
    responses: [SwaggerUtils.body200(APIAuthModels.resPhoneAuthConfirm)],
    body: APIAuthModels.reqPhoneAuthConfirm,
  })
  async phoneAuthConfirm(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: PhoneConfirmDto = req.body;
    const result = await AuthService.phoneLoginConfirm(dto);
    res.json(result);
  }

  @GET('/logout', {
    summary: 'Выход из аккаунта',
    handlers: [requireToken],
  })
  async logout(req: BaseRequest, res: Response, next: NextFunction) {
    const result = await AuthService.logout(req.xAccessToken);
    res.json(result);
  }
}

export default new Controller();
