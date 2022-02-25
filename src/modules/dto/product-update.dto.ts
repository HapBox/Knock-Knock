import { IsInt, IsString, IsUUID } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class ProductUpdateDto extends BaseDto {
  productId!: string;
  filialId!: string; //скорее всего не надо

  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsInt()
  price!: number;

  @IsUUID(4)
  categoryId!: string;

  //фото....
}
