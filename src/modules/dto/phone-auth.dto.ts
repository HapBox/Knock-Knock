import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class PhoneAuthDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  phone!: string;
}
