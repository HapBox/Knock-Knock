import { IsNotEmpty, IsString} from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class UserUpdateDto extends BaseDto {
  userId!: string;

  @IsNotEmpty()
  @IsString()
  phone!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;
}
