import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class RatingCreateDto extends BaseDto {
  storeId!: string;
  userId!:  string;

  @IsNotEmpty()
  @IsInt()
  rating!: number;

  @IsNotEmpty()
  @IsString()
  comment!: string;
}
