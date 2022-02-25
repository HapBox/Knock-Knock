import { IsInt, IsString } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class RatingUpdateDto extends BaseDto {
  ratingId!: string;

  @IsInt()
  rating!: number;

  @IsString()
  comment!: string;
}
