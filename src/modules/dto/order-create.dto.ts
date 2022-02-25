import { Type } from 'class-transformer';
import { IsEnum, IsUUID, IsDate, IsNotEmpty, ValidateNested } from 'class-validator';
import { PaymentTypes } from '../../utils/constants';
import { BaseDto } from '../base/base.dto';
import { OrderProductDto } from './order-product.dto';

export class OrderCreateDto extends BaseDto {
  @IsNotEmpty()
  @IsUUID(4)
  filialId!: string;

  @IsNotEmpty()
  @IsUUID(4)
  userAddressId!: string;

  @IsNotEmpty()
  @IsUUID(4)
  userId!: string;

  @IsNotEmpty()
  @IsEnum(PaymentTypes)
  payment!: string;

  @IsDate() //может быть прямо сейчас
  dateTo!: Date;

  @ValidateNested() //список продуктов в заказе
  @IsNotEmpty()
  @Type(() => OrderProductDto)
  products!: Array<OrderProductDto>;
}
