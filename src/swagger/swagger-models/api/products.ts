import { FileTypes } from '../../../utils/constants';
import APICategoriesModels from './categories';

export default class APIProductsModels {
  static resPromotionInfo = {
    id: 'UUID',
    discountPercent: 15,
    dateTo: '22.05.2022',
  };

  static resFile = {
    id: 'UUID',
    extension: 'jpg,png...',
    size: 1234,
    originalName: 'картинка1234.jpg',
    type: Object.values(FileTypes).join('/'),
    url: 'https://....',
  };

  static resProductInfo = {
    id: 'UUID',
    name: 'Название продукта',
    description: 'Описание продукта',
    price: 123,
    promotion: APIProductsModels.resPromotionInfo,
    promotionId: 'UUID',
    category: APICategoriesModels.resCategoryInfo,
    categoryId: 'UUID',
    image: APIProductsModels.resFile,
  };

  static resProductInfoList = {
    productList: [APIProductsModels.resProductInfo],
  };
}
