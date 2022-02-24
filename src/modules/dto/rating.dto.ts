import { IsInt, IsString } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class RatingDto extends BaseDto {
  @IsInt()
  rating!: number;

  @IsString()
  comment!: string;
}
