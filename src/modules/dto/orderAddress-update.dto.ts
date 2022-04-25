import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import { BaseDto } from '../base/base.dto';
import { AddressCreateDto } from './address-create.dto';

export class OrderAddressUpdateDto extends BaseDto {
  public orderId!: string;

  public userId!: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressCreateDto)
  userAddress!: AddressCreateDto;
}
