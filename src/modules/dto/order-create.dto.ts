import { IsEnum, IsUUID, IsDate, IsNotEmpty } from 'class-validator';
import { PaymentTypes } from '../../utils/constants';
import { BaseDto } from '../base/base.dto';

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

  //а что с продуктами делать??
}
