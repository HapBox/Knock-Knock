import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleTypes } from '../../utils/constants';
import { BaseDto } from '../base/base.dto';

export class StoreWorkerAddDto extends BaseDto {
  storeId!: string;

  @IsNotEmpty()
  @IsString()
  phone!: string;

  @IsEnum(RoleTypes)
  @IsNotEmpty()
  role!: string;
}
