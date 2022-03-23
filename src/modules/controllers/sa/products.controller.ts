import { NextFunction, Response } from 'express';
import { ApiController, DELETE, GET, PATCH, POST } from '../../../core/api-decorators';
import { requireToken } from '../../../middlewares/require-token';
import { dtoValidator } from '../../../middlewares/validate';
import { throwError } from '../../../utils/http-exception';
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
      'filialId?': 'ID филиала',
    },
  })
  async getProducts(req: BaseRequest, res: Response, next: NextFunction) {
    let productList;
    let category = req.query.category;
    let searchValue = req.query.searchValue;
    let filialId = req.query.filialId;
    if (category) {
      productList = await SaProductsService.getProductsByCategory(String(category));
    } else if (searchValue) {
      productList = await SaProductsService.getProductsBySearchValue(String(searchValue));
    } else if (filialId) {
      productList = await SaProductsService.getProductsByFilialId(String(filialId));
    } else {
      throwError({
        statusCode: 400,
        message: 'No search parameters',
      });
    }

    res.json(productList);
  }

  @GET('/:id', {
    summary: 'Получение продукта',
    handlers: [requireToken],
  })
  async getProduct(req: BaseRequest, res: Response, next: NextFunction) {
    let productId = req.params.id;
    let product = await SaProductsService.getProductById(productId);
    res.json(product);
  }

  @POST('/', {
    summary: 'Добавление продукта',
    handlers: [requireToken, dtoValidator(ProductCreateDto)],
  })
  async createProduct(req: BaseRequest, res: Response, next: NextFunction) {
    let dto = req.body;
    let product = await SaProductsService.createProduct(dto);
    res.json(product);
  }

  @PATCH('/:id', {
    summary: 'Обновление продукта',
    handlers: [requireToken, dtoValidator(ProductUpdateDto)],
  })
  async updateProduct(req: BaseRequest, res: Response, next: NextFunction) {
    let dto = { ...req.body, productId: req.params.id };
    let product = await SaProductsService.updateProductById(dto);
    res.json(product);
  }

  @DELETE('/:id', {
    summary: 'Удаление продукта',
    handlers: [requireToken],
  })
  async deleteProduct(req: BaseRequest, res: Response, next: NextFunction) {
    let productId = req.params.id;
    await SaProductsService.deleteProductById(productId);
    res.json({ message: 'Product deleted' });
  }

  @POST('/:id/promotion', {
    summary: 'Добавление акции',
    handlers: [requireToken, dtoValidator(PromotionCreateDto)],
  })
  async createPromotion(req: BaseRequest, res: Response, next: NextFunction) {
    let dto = { ...req.body, productId: req.params.id };
    let promotion = await SaProductsService.createPromotion(dto);
    res.json(promotion);
  }

  @DELETE('/:id/promotion', {
    summary: 'Удаление акции',
    handlers: [requireToken],
  })
  async deletePromotion(req: BaseRequest, res: Response, next: NextFunction) {
    let productId = req.params.id;
    await SaProductsService.deletePromotion(productId);
    res.json({ message: 'Promotion deleted' });
  }
}
export default new Controller();
