import { IsString } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class CategoryDto extends BaseDto {
  @IsString()
  name!: string;
}
