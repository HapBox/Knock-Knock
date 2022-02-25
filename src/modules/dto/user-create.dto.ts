import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class UserCreateDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;
}
