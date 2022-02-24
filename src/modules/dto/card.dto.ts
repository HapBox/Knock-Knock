import { IsDate, IsInt, IsUUID } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class CardDto extends BaseDto {
  @IsInt()
  number!: number;

  @IsDate()
  date!: Date;

  @IsInt()
  cvv!: number;

  @IsUUID(4)
  public userId!: string;
}
