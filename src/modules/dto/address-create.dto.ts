import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class AddressCreateDto extends BaseDto {
  userId?: string;

  @IsNotEmpty()
  @IsString()
  city!: string;

  @IsNotEmpty()
  @IsString()
  street!: string;

  @IsNotEmpty()
  @IsString()
  house!: string;

  @IsOptional()
  @IsInt()
  entrance!: number;

  @IsOptional()
  @IsInt()
  floor!: number;

  @IsOptional()
  @IsInt()
  apartment!: number;

  @IsOptional()
  @IsString()
  intercom!: string;
}
