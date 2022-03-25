import { BaseDto } from '../base/base.dto';

export class StoreFilialDeleteDto extends BaseDto {
  public filialId!: string;

  public storeId!: string;
}
