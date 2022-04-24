import SACategoriesModels from './categories';
import SAFileModels from './file-db';
import SAPromotionModels from './promotions';

export default class SAProductsModels {
  static reqProductCreate = {
    name: 'Название продукта',
    description: 'Описание продукта',
    price: 123,
    categoryId: 'UUID',
    filialId: 'UUID',
    imageId: 'UUID',
  };

  static reqProductUpdate = {
    name: 'Название продукта',
    description: 'Описание продукта',
    price: 123,
    imageId: 'UUID',
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
    image: SAFileModels.resFileDB,
  };

  static resProductInfoList = {
    productList: [SAProductsModels.resProductInfo],
  };
}
