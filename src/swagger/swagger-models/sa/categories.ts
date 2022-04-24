import SAFileModels from "./file-db";

export default class SACategoriesModels {
  static reqCategoryCreate = {
    name: 'Название категории',
    imageId: 'UUID',
  };

  static resCategoryInfo = {
    id: 'UUID',
    name: 'Название категории',
    image: SAFileModels.resFileDB,
  };

  static resCategoryInfoList = {
    categoryList: [SACategoriesModels.resCategoryInfo],
  };
}
