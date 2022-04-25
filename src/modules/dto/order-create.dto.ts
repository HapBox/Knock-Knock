import { Type } from 'class-transformer';
import { IsEnum, IsUUID, IsNotEmpty, ValidateNested, IsArray, ArrayNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { PaymentTypes } from '../../utils/constants';
import { BaseDto } from '../base/base.dto';
import { AddressCreateDto } from './address-create.dto';
import { OrderProductCreateDto } from './order-product.dto';

export class OrderCreateDto extends BaseDto {
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
  @IsDateString() //может быть прямо сейчас
  dateTo!: Date;

  @IsNotEmpty()
  @IsNumber()
  price!: number;

  @IsNotEmpty()
  @IsNumber()
  countPersons!: number;

  @ValidateNested() //список продуктов в заказе
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => OrderProductCreateDto)
  productList!: OrderProductCreateDto[];
}
