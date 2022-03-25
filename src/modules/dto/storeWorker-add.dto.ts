import { BaseDto } from '../base/base.dto';

export class StoreWorkerAddDto extends BaseDto {
  public storeId!: string;

  public workerPhone!: string;
}
