import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export default class SmsConfirm extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
    primaryKey: true,
  })
  public id!: string;

  @Column({
    type: DataType.STRING,
  })
  public phone!: string;

  @Column({
    type: DataType.STRING,
  })
  public code!: string;
}
