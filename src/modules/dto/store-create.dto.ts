import { IsNotEmpty, IsString, IsUUID} from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class StoreCreateDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsUUID(4)
  @IsNotEmpty()
  imageId!: string;
}
