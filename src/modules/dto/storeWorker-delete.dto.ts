import { BaseDto } from '../base/base.dto';

export class StoreWorkerDeleteDto extends BaseDto {
  public storeId!: string;

  public workerId!: string;
}
