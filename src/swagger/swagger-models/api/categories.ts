import { FileTypes } from '../../../utils/constants';

export default class APICategoriesModels {
  static resFile = {
    id: 'UUID',
    extension: 'jpg,png...',
    size: 1234,
    originalName: 'картинка1234.jpg',
    type: Object.values(FileTypes).join('/'),
    url: 'https://....',
  };

  static resCategoryInfo = {
    id: 'UUID',
    name: 'Название категории',
    image: APICategoriesModels.resFile,
  };

  static resCategoryInfoList = {
    categoryList: [APICategoriesModels.resCategoryInfo],
  };
}
