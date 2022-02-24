import { IsBoolean, IsEnum, IsString, IsUUID } from 'class-validator';
import { RoleTypes } from '../../utils/constants';
import { BaseDto } from '../base/base.dto';

export class UserDto extends BaseDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEnum(RoleTypes)
  role!: string;

  @IsBoolean()
  isBlocked!: boolean;

  @IsUUID(4)
  workStoreId!: string;
}
