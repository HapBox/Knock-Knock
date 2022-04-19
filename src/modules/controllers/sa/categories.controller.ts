import { NextFunction, Response } from 'express';
import { ApiController, DELETE, GET, PATCH, POST } from '../../../core/api-decorators';
import { requireRole } from '../../../middlewares/require-role';
import { requireToken } from '../../../middlewares/require-token';
import { dtoValidator } from '../../../middlewares/validate';
import SACategoriesModels from '../../../swagger/swagger-models/sa/categories';
import SwaggerUtils from '../../../swagger/swagger-utils';
import BaseRequest from '../../base/base.request';
import { CategoryCreateDto } from '../../dto/category-create.dto';
import { CategoryDeleteDto } from '../../dto/category-delete.dto';
import { CategoryUpdateDto } from '../../dto/category-update.dto';
import SaCategoriesService from '../../services/sa/sa-categories.service';

@ApiController('/sa/api/categories')
class Controller {
  @GET('/', {
    summary: 'Получение списка категорий',
    handlers: [requireToken, requireRole],
    responses: [SwaggerUtils.body200(SACategoriesModels.resCategoryInfoList)],
  })
  async getCategoryList(req: BaseRequest, res: Response, next: NextFunction) {
    const result = await SaCategoriesService.getCategoryList();
    res.json(result);
  }

  @POST('/', {
    summary: 'Создание категории товаров',
    handlers: [requireToken, requireRole, dtoValidator(CategoryCreateDto)],
    body: SACategoriesModels.reqCategoryCreate,
    responses: [SwaggerUtils.body200(SACategoriesModels.resCategoryInfo)],
  })
  async createCategory(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: CategoryCreateDto = {
      ...req.body,
      userRole: req.userRole,
    };
    const result = await SaCategoriesService.createCategory(dto);
    res.json(result);
  }

  @PATCH('/:id', {
    summary: 'Обновление информации о категории',
    handlers: [requireToken, requireRole, dtoValidator(CategoryUpdateDto)],
    body: SACategoriesModels.reqCategoryCreate,
    responses: [SwaggerUtils.body200(SACategoriesModels.resCategoryInfo)],
  })
  async patchCategory(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: CategoryUpdateDto = {
      ...req.body,
      userRole: req.userRole,
    };
    const result = await SaCategoriesService.patchCategory(dto);
    res.json(result);
  }

  @DELETE('/:id', {
    summary: 'Удаление категории',
    handlers: [requireToken, requireRole],
  })
  async deleteCategory(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: CategoryDeleteDto = {
        categoryId: req.params.id,
        userRole: req.userRole,
    };
    const result = await SaCategoriesService.deleteCategory(dto);
    res.json(result);
  }
}

export default new Controller();
