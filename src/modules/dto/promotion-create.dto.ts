import { IsInt, IsDate, IsNotEmpty } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class PromotionCreateDto extends BaseDto {
  productId!: string;

  @IsInt()
  @IsNotEmpty()
  discountPercent!: number;

  @IsDate()
  @IsNotEmpty()
  dateToEnd!: Date;
}
