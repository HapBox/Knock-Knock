import { BaseDto } from '../base/base.dto';

export class PromotionDeleteDto extends BaseDto {
  productId!: string;
  storeId!: string;
  promotionId!: string;
}
