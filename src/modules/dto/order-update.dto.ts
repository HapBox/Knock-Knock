import { Type } from 'class-transformer';
import { IsEnum, IsUUID, IsNotEmpty, ValidateNested, IsNotEmptyObject, IsOptional, IsDateString } from 'class-validator';
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

  @IsOptional()
  @IsUUID(4)
  cardId!: string;

  @IsOptional()
  @IsDateString()
  dateTo!: Date;
}
