import { Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import Address from '../final/address.model';
import User from '../final/user.model';


@Table({
  timestamps: true,
})
export default class UserAddress extends Model {
  @ForeignKey(() => User)
  @Column
  public userId!: string;

  @ForeignKey(() => Address)
  @Column
  public addressId!: string;
}
