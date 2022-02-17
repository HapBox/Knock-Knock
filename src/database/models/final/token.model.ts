import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import User from './user.model';

@Table({
  timestamps: true,
})
export default class Token extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
    primaryKey: true,
  })
  public id!: string;

  @Column({
    allowNull: false,
  })
  public value!: string;

  @ForeignKey(() => User)
  public userId!: string;

  @BelongsTo(() => User, 'userId')
  public user!: User;
}
