import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { ApiController, POST } from '../../../core/api-decorators';
import SAFileModels from '../../../swagger/swagger-models/sa/file-db';
import SwaggerUtils from '../../../swagger/swagger-utils';
import { throwError } from '../../../utils/http-exception';
import BaseRequest from '../../base/base.request';
import SAMediaService from '../../services/sa/sa-media.service';

@ApiController('/api/v1/sa/media')
class Controller {
  @POST('/', {
    summary: 'Метод для загрузки медиа файлов на сервер',
    responses: [SwaggerUtils.body200(SAFileModels.resFileDB)],
  })
  async uploadMedia(req: BaseRequest, res: Response, next: NextFunction) {
    if (!req.files || !req.files.file) {
      throwError({
        statusCode: 400,
        message: 'No file send',
      });
    }
    const result = await SAMediaService.uploadMedia(req.files.file as UploadedFile);
    res.json(result);
  }
}

export default new Controller();
