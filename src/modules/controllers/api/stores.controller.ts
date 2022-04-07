import { NextFunction, Response } from 'express';
import { ApiController, GET } from '../../../core/api-decorators';
import { dtoValidator } from '../../../middlewares/validate';
import APIFilialModels from '../../../swagger/swagger-models/api/filials';
import APIProductsModels from '../../../swagger/swagger-models/api/products';
import APIRatingModels from '../../../swagger/swagger-models/api/ratings';
import APIStoresModels from '../../../swagger/swagger-models/api/stores';
import SAProductsModels from '../../../swagger/swagger-models/sa/products';
import SwaggerUtils from '../../../swagger/swagger-utils';
import BaseRequest from '../../base/base.request';
import { StoreFilialGetDto } from '../../dto/storeFilial-get.dto';
import ApiStoresService from '../../services/api/api-stores.service';

@ApiController('/api/stores')
class Controller {
  @GET('/', {
    summary: 'Получение списка магазинов',
    query: {
      city: 'Название города',
      'category?': 'Название категории',
      'searchValue?': 'Название тега поиска',
    },
    responses: [SwaggerUtils.body200(APIStoresModels.resStoreInfoList)],
  })
  async getStores(req: BaseRequest, res: Response, next: NextFunction) {
    const result = await ApiStoresService.getStores(req.query); 
    res.json(result);
  }

  @GET('/:id', {
    summary: 'Получение информации о магазине и списка продуктов по id',
    responses: [SwaggerUtils.body200(APIStoresModels.resStoreFullInfo)],
  })
  async getStoreById(req: BaseRequest, res: Response, next: NextFunction) {
    const result = await ApiStoresService.getStoreById(req.params.id);
    res.json(result);
  }

  @GET('/:id/filials', {
    summary: 'Получение списка филиалов в городе',
    responses: [SwaggerUtils.body200(APIFilialModels.resFilialInfoList)],
  })
  async getStoreFilialList(req: BaseRequest, res: Response, next: NextFunction) {
    const result = await ApiStoresService.getFilialList(req.params.id);
    res.json(result);
  }

  @GET('/:storeId/filials/:filialId', {
    summary: 'Получение информации о филиале',
    responses: [SwaggerUtils.body200(APIFilialModels.resFilialShortInfo)],
  })
  async getStoreFilial(req: BaseRequest, res: Response, next: NextFunction) {
    const dto: StoreFilialGetDto = {
      filialId: req.params.filialId,
      storeId: req.params.storeId,
    };
    const result = await ApiStoresService.getFilialById(dto);
    res.json(result);
  }

  @GET('/:id/reviews', {
    summary: 'Получение всех отзывов на магазин',
    responses: [SwaggerUtils.body200(APIRatingModels.resRatingInfoList)],
  })
  async getRating(req: BaseRequest, res: Response, next: NextFunction) {
    const result = await ApiStoresService.getReviewList(req.params.id);
    res.json(result);
  }

  @GET('/:storeId/products', {
    summary: 'Получение продуктов по категории или тегу',
    query: {
      'category?': 'Название категории',
      'searchValue?': 'название тега',
    },
    responses: [SwaggerUtils.body200(APIProductsModels.resProductInfoList)],
  })
  async getStoreProducts(req: BaseRequest, res: Response, next: NextFunction) {
    let result;
    if (req.query.category) {
      result = await ApiStoresService.getProductsByCategory(String(req.query.category), req.params.storeId);
    } else if (req.query.searchValue) {
      result = await ApiStoresService.getProductsBySearch(String(req.query.searchValue), req.params.storeId);
    } else {
      result = await ApiStoresService.getProductsList(req.params.storeId);
    }
    res.json(result);
  }

  @GET('/product/:id', {
    summary: 'Получение продукта',
    responses: [SwaggerUtils.body200(SAProductsModels.resProductInfo)],
  })
  async getProduct(req: BaseRequest, res: Response, next: NextFunction) {
    const productId = req.params.id;
    const result = await ApiStoresService.getProductById(productId);
    res.json(result);
  }
}

export default new Controller();
