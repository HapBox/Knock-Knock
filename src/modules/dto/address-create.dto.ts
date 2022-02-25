//ждем помощи от господа бога

import { IsString, IsInt, IsNotEmpty } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class AddressCreateDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  city!: string;

  @IsNotEmpty()
  @IsString()
  street!: string;

  @IsNotEmpty()
  @IsString()
  house!: string;

  @IsInt()
  entrance!: number;

  @IsNotEmpty()
  @IsInt()
  floor!: number;

  @IsNotEmpty()
  @IsInt()
  apartment!: number;

  @IsString()
  intercom!: string;
}
