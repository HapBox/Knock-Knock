import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class StoreUpdateDto extends BaseDto {
  storeId!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  phone!: string;

  @IsUUID(4)
  @IsNotEmpty()
  imageId!: string;
}
