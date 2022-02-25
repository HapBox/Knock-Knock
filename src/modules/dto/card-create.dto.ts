import { IsDate, IsInt, IsNotEmpty, IsUUID } from 'class-validator';
import { BaseDto } from '../base/base.dto';

export class CardCreateDto extends BaseDto {
  @IsNotEmpty()
  @IsInt()
  number!: number;

  @IsNotEmpty()
  @IsDate()
  date!: Date;

  @IsNotEmpty()
  @IsInt()
  cvv!: number;

  @IsNotEmpty()
  @IsUUID(4)
  public userId!: string;
}
