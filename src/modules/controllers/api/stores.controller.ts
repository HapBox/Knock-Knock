import { NextFunction, Response } from 'express';
import { ApiController, GET } from '../../../core/api-decorators';
import { dtoValidator } from '../../../middlewares/validate';
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
      'category?': 'Название категории',
      'searchValue?': 'Название тега поиска',
    },
  })
  async getStores(req: BaseRequest, res: Response, next: NextFunction) {
    let result;
    if (req.query.category) {
      result = await ApiStoresService.getStoresByCategory(String(req.query.category));
    } else if (req.query.searchValue) {
      result = await ApiStoresService.getStoresBySearch(String(req.query.searchValue));
    }
    res.json(result);
  }

  @GET('/:id', {
    summary: 'Получение информации о магазине и списка продуктов по id',
  })
  async getStoreById(req: BaseRequest, res: Response, next: NextFunction) {
    const result = await ApiStoresService.getStoreById(req.params.id);
    res.json(result);
  }

  @GET('/:id/filials', {
    summary: 'Получение списка филиалов в городе',
  })
  async getStoreFilialList(req: BaseRequest, res: Response, next: NextFunction) {
    const result = await ApiStoresService.getFilialList(req.params.id);
    res.json(result);
  }

  @GET('/:storeId/filials/:filialId', {
    summary: 'Получение информации о филиале',
    handlers: [dtoValidator(StoreFilialGetDto)]
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
