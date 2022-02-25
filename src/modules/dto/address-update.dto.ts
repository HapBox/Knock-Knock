import { IsString, IsInt, IsBoolean, IsNotEmpty } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class AddressUpdateDto extends BaseDto {
  userId!: string; //если пользователь хочет изменить свой адрес
  addressId!: string;

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

  @IsInt()
  floor!: number;

  @IsInt()
  apartment!: number;

  @IsString()
  intercom!: string;
}
