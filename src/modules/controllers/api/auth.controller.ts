import { NextFunction, Response } from 'express';
import { ApiController, GET, POST } from '../../../core/api-decorators';
import { requireToken } from '../../../middlewares/require-token';
import BaseRequest from '../../base/base.request';
import AuthService from '../../services/auth.service';

@ApiController('/api/auth')
class Controller {
  @POST('/phone', {
    summary: 'Авторизация по номеру телефона (начало)',
  })
  async phoneAuthStart(req: BaseRequest, res: Response, next: NextFunction) {
    const dto = req.body;
    const code = await AuthService.phoneLoginStart(dto);
    res.json(code);
  }

  @POST('/phone/confirm', {
    summary: 'Авторизация по номеру телефона (завершение)',
  })
  async phoneAuthConfirm(req: BaseRequest, res: Response, next: NextFunction) {
    const dto = req.body;
    const token = await AuthService.phoneLoginConfirm(dto);
    res.json(token);
  }

  @GET('/logout', {
    summary: 'Выход из аккаунта',
    handlers: [requireToken],
  })
  async logout(req: BaseRequest, res: Response, next: NextFunction) {
    await AuthService.logout(req.xAccessToken);
    res.json({ message: 'Logout succesful!' });
  }
}

export default new Controller();
