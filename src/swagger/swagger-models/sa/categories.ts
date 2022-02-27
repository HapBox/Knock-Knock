export default class SACategoriesModels {
  static reqCategoryCreate = {
    name: 'Название категории',
    //image
  };

  static resCategoryInfo = {
    id: 'UUID',
    name: 'Название категории',
    //image
  };

  static resCategoryInfoList = {
    categoryList: [SACategoriesModels.resCategoryInfo],
  };
}
