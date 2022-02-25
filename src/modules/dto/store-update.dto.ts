import { IsString } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class StoreUpdateDto extends BaseDto {
  storeId!: string;

  @IsString()
  name!: string;

  @IsString()
  phone!: string;

  //фото.............
}
