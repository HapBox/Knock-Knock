import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class StoreCreateDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  //Фото продумать....
}
