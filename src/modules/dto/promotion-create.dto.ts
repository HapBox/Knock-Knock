import { IsInt, IsDate, IsNotEmpty } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class PromotionCreateDto extends BaseDto {
  @IsInt()
  @IsNotEmpty()
  discountProcent!: number;

  @IsDate()
  @IsNotEmpty()
  dateToEnd!: Date;
}
