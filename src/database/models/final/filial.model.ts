import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import Address from './address.model';
import Order from './order.model';
import Store from './store.model';

@Table({
  timestamps: true,
})
export default class Filial extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
    primaryKey: true,
  })
  public id!: string;

  @ForeignKey(() => Store)
  public storeId!: string;

  @BelongsTo(() => Store, 'storeId')
  public store!: Store;

  @ForeignKey(() => Address)
  public addressId!: string;

  @BelongsTo(() => Address, 'addressId')
  public address!: Address;

  @HasMany(() => Order, 'filialId')
  public orderList!: Order[];
}
