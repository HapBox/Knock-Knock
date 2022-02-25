import { IsString } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class CategoryUpdateDto extends BaseDto {
  categoryId!: string;

  @IsString()
  name!: string;

  //фото.....
}
