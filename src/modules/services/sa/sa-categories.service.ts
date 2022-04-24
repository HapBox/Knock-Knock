import Category from '../../../database/models/final/category.model';
import FileDB from '../../../database/models/final/file-db.model';
import { RoleTypes } from '../../../utils/constants';
import { throwError } from '../../../utils/http-exception';
import { CategoryCreateDto } from '../../dto/category-create.dto';
import { CategoryDeleteDto } from '../../dto/category-delete.dto';
import { CategoryUpdateDto } from '../../dto/category-update.dto';

export default class SaCategoriesService {
  static async getCategoryList() {
    return await Category.findAll({ include: { model: FileDB } });
  }

  static async createCategory(dto: CategoryCreateDto) {
    if (dto.userRole !== RoleTypes.ADMIN) {
      throwError({
        statusCode: 403,
        message: 'Access denied',
      });
    }

    const category = await Category.create({ ...dto });
    return category;
  }

  static async patchCategory(dto: CategoryUpdateDto) {
    if (dto.userRole !== RoleTypes.ADMIN) {
      throwError({
        statusCode: 403,
        message: 'Access denied',
      });
    }

    const category = await Category.findByPk(dto.categoryId);
    if (!category)
      throwError({
        statusCode: 404,
        message: 'Category not found',
      });

    await category.update({
      ...dto,
    });
    return category;
  }

  static async deleteCategory(dto: CategoryDeleteDto) {
    if (dto.userRole !== RoleTypes.ADMIN) {
      throwError({
        statusCode: 403,
        message: 'Access denied',
      });
    }

    const category = await Category.findByPk(dto.categoryId);
    if (!category)
      throwError({
        statusCode: 404,
        message: 'Category not found',
      });

    await category.destroy();
    return { message: 'Delete succesfull' };
  }
}
