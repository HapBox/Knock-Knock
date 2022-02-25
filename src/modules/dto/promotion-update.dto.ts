import { IsInt, IsDate } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class PromotionUpdateDto extends BaseDto {
  promotionId!: string;

  @IsInt()
  discountProcent!: number;

  @IsDate()
  dateToEnd!: Date;
}
