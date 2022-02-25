import { IsNotEmpty, IsUUID } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class FilialCreateDto extends BaseDto {
  storeId!: string;

  @IsUUID(4)
  @IsNotEmpty()
  addressId!: string;
}
