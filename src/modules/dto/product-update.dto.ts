import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class ProductUpdateDto extends BaseDto {
  productId!: string;
  filialId!: string; //скорее всего не надо

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsInt()
  price!: number;

  @IsNotEmpty()
  @IsUUID(4)
  categoryId!: string;

  @IsUUID(4)
  @IsNotEmpty()
  imageId!: string;
}
