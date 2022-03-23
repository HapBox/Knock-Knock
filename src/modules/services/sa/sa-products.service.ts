import { Op } from 'sequelize';
import Category from '../../../database/models/final/category.model';
import Product from '../../../database/models/final/product.model';
import Promotion from '../../../database/models/final/promotion.model';
import { throwError } from '../../../utils/http-exception';
import { ProductCreateDto } from '../../dto/product-create.dto';
import { ProductUpdateDto } from '../../dto/product-update.dto';
import { PromotionCreateDto } from '../../dto/promotion-create.dto';

export default class SaProductsService {
  static async getProducts() {
    let productList = await Product.findAll({
      include: [
        {
          model: Promotion,
          duplicating: false,
        },
      ],
    });
    return productList;
  }

  static async getProductsByCategory(categoryName: string) {
    let category = await Category.findOne({
      where: {
        name: categoryName,
      },
    });

    if (!category) {
      throwError({
        statusCode: 404,
        message: 'Category not found',
      });
    }

    let productList = await Product.findAll({
      where: {
        categoryId: category.id,
      },
      include: [
        {
          model: Promotion,
          duplicating: false,
        },
      ],
    });

    return productList;
  }

  static async getProductsBySearchValue(searchValue: string) {
    let productList = await Product.findAll({
      where: {
        name: {
          [Op.like]: '%' + searchValue + '%',
        },
      },
      include: [
        {
          model: Promotion,
          duplicating: false,
        },
      ],
    });

    return productList;
  }

  static async getProductsByFilialId(filialId: string) {
    let productList = await Product.findAll({
      where: {
        filialId: filialId,
      },
      include: [
        {
          model: Promotion,
          duplicating: false,
        },
      ],
    });

    return productList;
  }

  static async getProductById(productId: string) {
    let product = await Product.findByPk(productId, {
      include: [
        {
          model: Promotion,
          duplicating: false,
        },
      ],
    });
    if (!product)
      throwError({
        statusCode: 404,
        message: 'Product not found',
      });
    return product;
  }

  static async createProduct(dto: ProductCreateDto) {
    let product = await Product.create(dto);
    return product;
  }

  static async updateProductById(dto: ProductUpdateDto) {
    let product = await Product.findByPk(dto.productId, {
      include: [
        {
          model: Promotion,
          duplicating: false,
        },
      ],
    });
    if (!product)
      throwError({
        statusCode: 404,
        message: 'Product not found',
      });

    await product.update({
      ...dto,
    });
    return product;
  }

  static async deleteProductById(productId: string) {
    let product = await Product.findByPk(productId);

    if (!product)
      throwError({
        statusCode: 404,
        message: 'Product not found',
      });

    await product.destroy();
  }

  static async createPromotion(dto: PromotionCreateDto) {
    let product = await Product.findByPk(dto.productId);

    if (!product)
      throwError({
        statusCode: 404,
        message: 'Product not found',
      });

    let promotion = await Promotion.create({
      ...dto,
    });

    await product.update({
      promotionId: promotion.id,
    });

    return promotion;
  }

  static async deletePromotion(productId: string) {
    let product = await Product.findByPk(productId);

    if (!product)
      throwError({
        statusCode: 404,
        message: 'Product not found',
      });

    let promotion = await Promotion.findByPk(product.promotionId);

    if (!promotion) {
      throwError({
        statusCode: 404,
        message: 'Promotion not found',
      });
    }
    await promotion.destroy();
    await product.update({ promotionId: '' });
  }
}
