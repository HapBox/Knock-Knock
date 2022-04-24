import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import UserAddress from '../relations/user-address.model';
import User from './user.model';

@Table({
  timestamps: true,
})
export default class Address extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
    primaryKey: true,
  })
  public id!: string;

  @Column({
    allowNull: false,
  })
  public city!: string;

  @Column({
    allowNull: false,
  })
  public street!: string;

  @Column({
    allowNull: false,
  })
  public house!: string;

  @Column({
    allowNull: true,
    type: DataType.SMALLINT,
  })
  public entrance!: number;

  @Column({
    allowNull: true,
    type: DataType.SMALLINT,
  })
  public floor!: number;

  @Column({
    allowNull: true,
    type: DataType.SMALLINT,
  })
  public apartment!: number;

  @Column({
    allowNull: true,
  })
  public intercom!: string;

  @BelongsToMany(() => User, () => UserAddress)
  public userList!:  User[];
}
