import { BaseDto } from '../base/base.dto';

export class OrderCancelDto extends BaseDto {
  public orderId!: string;

  public userId!: string;
}
