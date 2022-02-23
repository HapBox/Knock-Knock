import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { RoleTypes } from '../../../utils/constants';
import UserAddress from '../relations/user-address.model';
import Address from './address.model';
import Card from './card.model';
import Order from './order.model';
import Rating from './rating.model';
import Store from './store.model';
import Token from './token.model';

@Table({
  timestamps: true,
})
export default class User extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
    primaryKey: true,
  })
  public id!: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  public phone!: string;

  @Column({
    allowNull: false,
  })
  public firstName!: string;

  @Column({
    allowNull: false,
  })
  public lastName!: string;

  @Column({
    defaultValue: false,
  })
  public isBlocked!: boolean;

  @HasMany(() => Token, 'userId')
  public tokenList!: Token[];

  @HasMany(() => Card, 'userId')
  public cardList!: Card[];

  @HasMany(() => Order, 'userId')
  public orderList!: Order[];

  @HasMany(() => Rating, 'userId')
  public ratingList!: Rating[];

  @BelongsToMany(() => Address, () => UserAddress)
  public addressList!: Address[];

  @Column({
    defaultValue: RoleTypes.USER,
    type: DataType.ENUM({ values: Object.values(RoleTypes) }),
  })
  public role!: string;

  @ForeignKey(() => Store)
  public workStoreId!: string;

  @BelongsTo(() => Store, 'workStoreId')
  public store!: Store;
}
