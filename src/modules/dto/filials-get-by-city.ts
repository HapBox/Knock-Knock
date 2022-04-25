import { BaseDto } from '../base/base.dto';

export class FilialGetByCity extends BaseDto {
  city!: string;
  storeId!:  string;
}
