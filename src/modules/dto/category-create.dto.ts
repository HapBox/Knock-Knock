import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class CategoryCreateDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsUUID(4)
  @IsNotEmpty()
  imageId!: string;
}
