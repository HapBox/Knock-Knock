import SACategoriesModels from './categories';
import SAPromotionModels from './promotions';

export default class SAProductsModels {
  static reqProductCreate = {
    name: 'Название продукта',
    description: 'Описание продукта',
    price: 123,
    categoryId: 'UUID',
    filialId: 'UUID',
    //image
  };

  static reqProductUpdate = {
    name: 'Название продукта',
    description: 'Описание продукта',
    price: 123,
    //image
  };

  static resProductInfo = {
    id: 'UUID',
    name: 'Название продукта',
    description: 'Описание продукта',
    price: 123,
    'promotion?': SAPromotionModels.resPromotionInfo,
    'promotionId?': 'UUID',
    category: SACategoriesModels.resCategoryInfo,
    categoryId: 'UUID',
    //image
  };

  static resProductInfoList = {
    productList: [SAProductsModels.resProductInfo],
  };
}
