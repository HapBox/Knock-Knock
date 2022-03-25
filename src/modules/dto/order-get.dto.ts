import { BaseDto } from '../base/base.dto';

export class OrderGetDto extends BaseDto {
  public orderId!: string;

  public userId!: string;
}
