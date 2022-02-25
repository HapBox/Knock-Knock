import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class ProductCreateDto extends BaseDto {
  filialId!: string;

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

  //фото....
}
