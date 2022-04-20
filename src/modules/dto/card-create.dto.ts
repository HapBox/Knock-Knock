import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class CardCreateDto extends BaseDto {
  public userId!: string;

  @IsNotEmpty()
  @IsInt()
  number!: number;

  @IsNotEmpty()
  @IsString()
  date!: string;

  @IsNotEmpty()
  @IsInt()
  cvv!: number;
}
