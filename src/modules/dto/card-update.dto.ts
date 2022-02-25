import { IsDate, IsInt, IsNotEmpty } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class CardUpdateDto extends BaseDto {
  cardId!: string;

  @IsNotEmpty()
  @IsInt()
  number!: number;

  @IsNotEmpty()
  @IsDate()
  date!: Date;

  @IsNotEmpty()
  @IsInt()
  cvv!: number;
}
