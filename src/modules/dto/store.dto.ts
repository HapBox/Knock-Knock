import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class StoreDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;
}
