import { IsEnum, IsNotEmpty, IsString} from 'class-validator';
import { RoleTypes } from '../../utils/constants';
import { BaseDto } from '../base/base.dto';

export class StoreCreateDto extends BaseDto {
  @IsEnum(RoleTypes)
  @IsNotEmpty()
  userRole!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  //Фото продумать....
}
