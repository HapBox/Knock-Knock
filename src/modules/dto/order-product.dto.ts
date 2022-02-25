import { IsUUID, IsNotEmpty, IsInt } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class OrderProductCreateDto extends BaseDto {
  @IsNotEmpty()
  @IsUUID(4)
  productId!: string;

  @IsNotEmpty()
  @IsInt()
  count!: number;
}
