import { NextFunction, Response } from 'express';
import { ApiController, GET, POST } from '../../../core/api-decorators';
import BaseRequest from '../../base/base.request';

@ApiController('/api/auth')
class Controller {
  @POST('/phone', {
    summary: 'Авторизация по номеру телефона',
  })
  async phoneAuthStart(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @POST('/phone/confirm', {
    summary: 'Авторизация по номеру телефона',
  })
  async phoneAuthConfirm(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @GET('/token/check', {
    summary: 'Проверка токена на валидность',
  })
  async tokenCheck(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }

  @GET('/logout', {
    summary: 'Выход из аккаунта',
  })
  async logout(req: BaseRequest, res: Response, next: NextFunction) {
    res.json({ message: 'ok' });
  }
}

export default new Controller();