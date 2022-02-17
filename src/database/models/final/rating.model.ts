import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import Store from './store.model';
import User from './user.model';

@Table({
  timestamps: true,
})
export default class Rating extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
    primaryKey: true,
  })
  public id!: string;

  @ForeignKey(() => User)
  public userId!: string;

  @BelongsTo(() => User, 'userId')
  public userList!: User;

  @ForeignKey(() => Store)
  public storeId!: string;

  @BelongsTo(() => Store, 'storeId')
  public storeList!: Store;

  @Column({
    type: DataType.SMALLINT,
    allowNull: false,
  })
  public rating!: number;

  @Column({
    allowNull: true,
  })
  public comment!: string;
}
