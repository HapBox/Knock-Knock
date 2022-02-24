//ждем помощи от господа бога

import { IsString, IsInt } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class AddressDto extends BaseDto {
  @IsString()
  city!: string;

  @IsString()
  street!: string;

  @IsString()
  hous!: string;

  @IsInt()
  entrance!: number;

  @IsInt()
  floor!: number;

  @IsInt()
  apartment!: number;

  @IsString()
  intercom!: string;
}
