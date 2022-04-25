import { BaseDto } from '../base/base.dto';

export class ProductSearch extends BaseDto {
  productId!: string;
  storeId!: string;
}
