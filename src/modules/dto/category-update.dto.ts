import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class CategoryUpdateDto extends BaseDto {
  categoryId!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsUUID(4)
  @IsNotEmpty()
  imageId!: string;
}
