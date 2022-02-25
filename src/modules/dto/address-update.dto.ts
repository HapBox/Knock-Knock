import { IsString, IsInt, IsBoolean } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class AddressUpdateDto extends BaseDto {
  userId!: string; //если пользователь хочет изменить свой адрес
  addressId!: string;

  @IsBoolean()
  isFavorite!: Boolean; //если пользователь хочет адрес избранным

  @IsString()
  city!: string;

  @IsString()
  street!: string;

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
