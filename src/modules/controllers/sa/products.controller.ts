import { NextFunction, Response } from 'express';
import { ApiController, DELETE, GET, PATCH, POST } from '../../../core/api-decorators';
import { requireToken } from '../../../middlewares/require-token';
import { dtoValidator } from '../../../middlewares/validate';
import SAProductsModels from '../../../swagger/swagger-models/sa/products';
import SAPromotionModels from '../../../swagger/swagger-models/sa/promotions';
import SwaggerUtils from '../../../swagger/swagger-utils';
import BaseRequest from '../../base/base.request';
import { ProductCreateDto } from '../../dto/product-create.dto';
import { ProductUpdateDto } from '../../dto/product-update.dto';
import { PromotionCreateDto } from '../../dto/promotion-create.dto';
import SaProductsService from '../../services/sa/sa-products.service';

//перекинуть в store
@ApiController('/api/products')
class Controller {
  @GET('/', {
    summary: 'Получение всех продуктов',
    handlers: [requireToken],
    query: {
      'category?': 'Название категории',
      'searchValue?': 'Название тега поиска',
      'storeId?': 'ID магазина',
    },
    responses: [SwaggerUtils.body200(SAProductsModels.resProductInfoList)],
  })
  async getProducts(req: BaseRequest, res: Response, next: NextFunction) {
    let result;
    if (req.query.category) {
      result = await SaProductsService.getProductsByCategory(String(req.query.category));
    } else if (req.query.searchValue) {
      result = await SaProductsService.getProductsBySearchValue(String(req.query.searchValue));
    } else if (req.query.storeId) {
      result = await SaProductsService.getProductsByStoreId(String(req.query.storeId));
    } else {
      result = await SaProductsService.getProducts();
    }

    res.json(result);
  }

  @GET('/categorySummary', {
    summary: 'Получение количества товаров по каждой категории',
    handlers: [requireToken],
  })
  async getCategorySummary(req: BaseRequest, res: Response, next: NextFunction) {
    const result = await SaProductsService.getCategoriesSummary();
    res.json(result);
  }

  @GET('/:id', {
    summary: 'Получение продукта',
    handlers: [requireToken],
    responses: [SwaggerUtils.body200(SAProductsModels.resProductInfo)],
  })
  async getProduct(req: BaseRequest, res: Response, next: NextFunction) {
    const productId = req.params.id;
    const result = await SaProductsService.getProductById(productId);
    res.json(result);
  }

  @POST('/', {
    summary: 'Добавление продукта',
    handlers: [requireToken, dtoValidator(ProductCreateDto)],
    body: SAProductsModels.reqProductCreate,
    responses: [SwaggerUtils.body200(SAProductsModels.resProductInfo)],
  })
  async createProduct(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: ProductCreateDto = req.body;
    const result = await SaProductsService.createProduct(dto);
    res.json(result);
  }

  @PATCH('/:id', {
    summary: 'Обновление продукта',
    handlers: [requireToken, dtoValidator(ProductUpdateDto)],
    body: SAProductsModels.reqProductCreate,
    responses: [SwaggerUtils.body200(SAProductsModels.resProductInfo)],
  })
  async updateProduct(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: ProductUpdateDto = {
      ...req.body,
      productId: req.params.id,
    };
    const result = await SaProductsService.updateProductById(dto);
    res.json(result);
  }

  @DELETE('/:id', {
    summary: 'Удаление продукта',
    handlers: [requireToken],
  })
  async deleteProduct(req: BaseRequest, res: Response, next: NextFunction) {
    const productId = req.params.id;
    const result = await SaProductsService.deleteProductById(productId);
    res.json(result);
  }

  @POST('/:id/promotion', {
    summary: 'Добавление акции',
    handlers: [requireToken, dtoValidator(PromotionCreateDto)],
    body: SAPromotionModels.reqPromotionInfo,
    responses: [SwaggerUtils.body200(SAPromotionModels.resPromotionInfo)],
  })
  async createPromotion(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: PromotionCreateDto = {
      ...req.body,
      productId: req.params.id,
    };
    const result = await SaProductsService.createPromotion(dto);
    res.json(result);
  }

  @DELETE('/:id/promotion', {
    summary: 'Удаление акции',
    handlers: [requireToken],
  })
  async deletePromotion(req: BaseRequest, res: Response, next: NextFunction) {
    const productId = req.params.id;
    const result = await SaProductsService.deletePromotion(productId);
    res.json(result);
  }
}
export default new Controller();
