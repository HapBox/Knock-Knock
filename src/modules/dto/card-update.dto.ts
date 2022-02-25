import { IsDate, IsInt } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class CardUpdateDto extends BaseDto {
  cardId!: string;

  @IsInt()
  number!: number;

  @IsDate()
  date!: Date;

  @IsInt()
  cvv!: number;
}
