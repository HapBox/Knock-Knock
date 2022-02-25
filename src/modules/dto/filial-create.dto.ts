import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import { BaseDto } from '../base/base.dto';
import { AddressCreateDto } from './address-create.dto';

export class FilialCreateDto extends BaseDto {
  storeId!: string;

  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => AddressCreateDto)
  address!: AddressCreateDto;
}
