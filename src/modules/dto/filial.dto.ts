import { IsNotEmpty, IsUUID } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class FilialDto extends BaseDto {
  @IsUUID(4)
  @IsNotEmpty()
  addressId!: string;
}
