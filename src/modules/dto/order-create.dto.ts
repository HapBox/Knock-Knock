import { Type } from 'class-transformer';
import { IsEnum, IsUUID, IsDate, IsNotEmpty, ValidateNested, IsArray, ArrayNotEmpty, IsNotEmptyObject } from 'class-validator';
import { PaymentTypes } from '../../utils/constants';
import { BaseDto } from '../base/base.dto';
import { AddressCreateDto } from './address-create.dto';
import { OrderProductCreateDto } from './order-product.dto';

export class OrderCreateDto extends BaseDto {
  userId!: string;

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

  @IsDate() //может быть прямо сейчас
  dateTo!: Date;

  @ValidateNested() //список продуктов в заказе
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => OrderProductCreateDto)
  products!: OrderProductCreateDto[];
}
