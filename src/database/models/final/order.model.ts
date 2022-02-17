import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { PaymentTypes, StatusTypes } from '../../../utils/constants';
import OrderProduct from '../relations/order-product.model';
import Address from './address.model';
import Filial from './filial.model';
import Product from './product.model';
import User from './user.model';

@Table({
  timestamps: true,
})
export default class Order extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
    primaryKey: true,
  })
  public id!: string;

  @Column({
    allowNull: false,
  })
  public price!: number;

  @Column({
    allowNull: true,
  })
  public dateTo!: Date;

  @ForeignKey(() => User)
  public userId!: string;

  @BelongsTo(() => User, 'userId')
  public user!: User;

  @ForeignKey(() => Filial)
  public filialId!: string;

  @BelongsTo(() => Filial, 'filialId')
  public filial!: Filial;

  @ForeignKey(() => Address)
  public userAddressId!: string;

  @BelongsTo(() => Address, 'userAddressId')
  public address!: Address;

  @Column({
    defaultValue: StatusTypes.PROCESSING,
    type: DataType.ENUM({ values: Object.values(StatusTypes) }),
  })
  public status!: string;

  @Column({
    type: DataType.ENUM({ values: Object.values(PaymentTypes) }),
  })
  public payment!: string;

  @BelongsToMany(() => Product, () => OrderProduct)
  public productList!: Product[];
}
