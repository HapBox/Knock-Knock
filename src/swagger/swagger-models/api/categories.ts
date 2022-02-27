export default class APICategoriesModels {
  static resCategoryInfo = {
    id: 'UUID',
    name: 'Название категории',
    //image
  };

  static resCategoryInfoList = {
    categoryList: [APICategoriesModels.resCategoryInfo],
  };
}
