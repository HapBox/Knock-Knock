import { IsInt, IsDate, IsNotEmpty, IsDateString } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class PromotionCreateDto extends BaseDto {
  productId!: string;
  storeId!: string;

  @IsInt()
  @IsNotEmpty()
  discountPercent!: number;

  @IsDateString()
  @IsNotEmpty()
  dateToEnd!: Date;
}
