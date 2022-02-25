import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { RoleTypes } from '../../utils/constants';
import { BaseDto } from '../base/base.dto';

export class UserUpdateDto extends BaseDto {
  userId!: string;

  @IsNotEmpty()
  @IsString()
  phone!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;
}
