import { NextFunction, Response } from 'express';
import { ApiController, GET } from '../../../core/api-decorators';
import BaseRequest from '../../base/base.request';
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
    let storeList;
    if (req.query.category) {
      storeList = await ApiStoresService.getStoresByCategory(String(req.query.category));
    } else if (req.query.searchValue) {
      storeList = await ApiStoresService.getStoresBySearch(String(req.query.searchValue));
    }
    res.json(storeList);
  }

  @GET('/:id', {
    summary: 'Получение информации о магазине по id',
  })
  async getStoreById(req: BaseRequest, res: Response, next: NextFunction) {
    const store = await ApiStoresService.getStoreById(req.params.id);
    res.json(store);
  }

  @GET('/:id/filials', {
    summary: 'Получение списка филиалов в городе',
  })
  async getStoreFilialList(req: BaseRequest, res: Response, next: NextFunction) {
    const filialList = await ApiStoresService.getFilialList(req.params.id);
    res.json(filialList);
  }

  @GET('/:storeId/filials/:filialId', {
    summary: 'Получение информации о филиале',
  })
  async getStoreFilial(req: BaseRequest, res: Response, next: NextFunction) {
    const filial = await ApiStoresService.getFilialById(req.params.filialId, req.params.storeId);
    res.json(filial);
  }

  @GET('/:id/reviews', {
    summary: 'Получение всех отзывов на магазин',
  })
  async getRating(req: BaseRequest, res: Response, next: NextFunction) {
    const reviewList = await ApiStoresService.getReviewList(req.params.id);
    res.json(reviewList);
  }

  @GET('/:storeId/filials/:filialId/products', {
    summary: 'Получение продуктов по категории или тегу',
    query: {
      'category?': 'Название категории',
      'searchValue?': 'название тега',
    },
  })
  async getStoreProducts(req: BaseRequest, res: Response, next: NextFunction) {
    let productList;
    if (req.query.category) {
      productList = await ApiStoresService.getProductsByCategory(String(req.query.category));
    } else if (req.query.searchValue) {
      productList = await ApiStoresService.getProductsBySearch(String(req.query.searchValue));
    } else {
      productList = await ApiStoresService.getProductsList(req.params.filialId);
    }
    res.json(productList);
  }
}

export default new Controller();
