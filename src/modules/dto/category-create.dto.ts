import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class CategoryCreateDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  //фото.....
}
