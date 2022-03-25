import { BaseDto } from '../base/base.dto';

export class CardDeleteDto extends BaseDto {
  public userId!: string;

  public cardId!: string;
}
