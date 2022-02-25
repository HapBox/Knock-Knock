import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import User from './user.model';

@Table({
  timestamps: true,
})
export default class Card extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
    primaryKey: true,
  })
  public id!: string;

  @Column({
    allowNull: false,
    type: DataType.BIGINT,
  })
  public number!: string;

  @Column({
    allowNull: false,
  })
  public date!: Date;

  @Column({
    allowNull: false,
    type: DataType.SMALLINT,
  })
  public cvv!: number;

  @Column({
    defaultValue: true
  })
  public isExist!: Boolean;

  @ForeignKey(() => User)
  public userId!: string;

  @BelongsTo(() => User, 'userId')
  public user!: User;
}
