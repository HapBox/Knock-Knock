import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class RatingUpdateDto extends BaseDto {
  ratingId!: string;

  @IsNotEmpty()
  @IsInt()
  rating!: number;

  @IsNotEmpty()
  @IsString()
  comment!: string;
}
