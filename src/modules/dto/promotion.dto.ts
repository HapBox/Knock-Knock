import { IsInt, IsDate } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class PromotionDto extends BaseDto {
  @IsInt()
  discountProcent!: number;

  @IsDate()
  dateToEnd!: Date;
}
