// Base dtop if needed, inherit your dto from this one

import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IsUUID } from 'sequelize-typescript';
import { RoleTypes } from '../../utils/constants';

export abstract class BaseDto {
  @IsString()
  @IsOptional()
  value?: string;

  @IsString()
  @IsOptional()
  public userId?: string;

  @IsOptional()
  @IsEnum(RoleTypes)
  public userRole?: string;

  @IsOptional()
  @IsUUID(4)
  public workStoreId?: string;
}
