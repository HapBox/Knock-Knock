// Base dtop if needed, inherit your dto from this one

import { Equals, IsOptional, IsString } from 'class-validator';

export abstract class BaseDto {
  @IsString()
  @IsOptional()
  value?: string;

  @Equals(undefined)
  public userId?: string;
}
