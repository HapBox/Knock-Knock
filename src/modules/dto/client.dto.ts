import { IsString } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class ClientDto extends BaseDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;
}
