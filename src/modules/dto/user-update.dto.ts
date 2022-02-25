import { IsEnum, IsString, IsUUID } from 'class-validator';
import { RoleTypes } from '../../utils/constants';
import { BaseDto } from '../base/base.dto';

export class UserUpdateDto extends BaseDto {
  userId!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEnum(RoleTypes)
  role!: string;

  @IsUUID(4)
  workStoreId!: string;
}
