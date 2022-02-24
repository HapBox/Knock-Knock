import { IsInt, IsString, IsUUID } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class ProductDto extends BaseDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsInt()
  price!: number;

  @IsUUID(4)
  categoryId!: string;
}
