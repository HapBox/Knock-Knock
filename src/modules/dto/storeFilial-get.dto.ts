import { BaseDto } from '../base/base.dto';

export class StoreFilialGetDto extends BaseDto {
  public filialId!: string;

  public storeId!: string;
}
