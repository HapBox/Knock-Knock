import { BaseDto } from '../base/base.dto';

export class OrderAddressUpdateDto extends BaseDto {
  public orderId!: string;

  public userId!: string;

  public addressId!: string;
}
