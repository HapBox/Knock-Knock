import { Type } from 'class-transformer';
import { IsEnum, IsUUID, IsDate, IsNotEmpty, ValidateNested, IsNotEmptyObject } from 'class-validator';
import { PaymentTypes } from '../../utils/constants';
import { BaseDto } from '../base/base.dto';
import { AddressCreateDto } from './address-create.dto';

export class OrderUpdateDto extends BaseDto {
  orderId!: string;

  @IsNotEmpty()
  @IsUUID(4)
  filialId!: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AddressCreateDto)
  userAddress!: AddressCreateDto;

  @IsNotEmpty()
  @IsEnum(PaymentTypes)
  payment!: string;

  @IsUUID(4)
  cardId!: string;

  @IsDate()
  dateTo!: Date;
}
