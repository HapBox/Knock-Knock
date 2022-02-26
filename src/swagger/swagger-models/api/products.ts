import APICategories from './categories';

export default class APIProductsModels {
  static resPromotionInfo = {
    id: 'UUID',
    discountPercent: 15,
    dateTo: '22.05.2022',
  };

  static resProductInfo = {
    id: 'UUID',
    name: 'Название продукта',
    phone: 'Телефон горячей линии магазина',
    description: 'Описание продукта',
    price: 123,
    promotion: APIProductsModels.resPromotionInfo,
    promotionId: 'UUID',
    category: APICategories.resCategoryInfo,
    categoryId: 'UUID',
    //image
  };

  static resProductInfoList = {
    productList: [APIProductsModels.resProductInfo],
  };
}
