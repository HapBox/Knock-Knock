import { IsBoolean, IsString } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class AdminDto extends BaseDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsBoolean()
  isBlocked!: Boolean;
}
//продумать с workStoreId