import { Type } from 'class-transformer';
import { ValidateNested, IsNotEmptyObject } from 'class-validator';
import { BaseDto } from '../base/base.dto';
import { AddressCreateDto } from './address-create.dto';

export class FilialUpdateDto extends BaseDto {
  storeId!: string;

  filialId!: string;

  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => AddressCreateDto)
  address!: AddressCreateDto;
}
