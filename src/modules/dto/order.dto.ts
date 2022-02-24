import { IsEnum, IsUUID, IsDate } from 'class-validator';
import { PaymentTypes } from '../../utils/constants';
import { BaseDto } from '../base/base.dto';

export class OrderDto extends BaseDto {
  @IsUUID(4)
  filialId!: string;

  @IsEnum(PaymentTypes)
  payment!: string;

  @IsDate()
  dateTo!: Date;

  @IsUUID(4)
  userAddressId!: string;
}
