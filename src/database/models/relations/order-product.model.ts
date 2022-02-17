import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import Order from '../final/order.model';
import Product from '../final/product.model';

@Table({
  timestamps: true,
})
export default class OrderProduct extends Model {
  @ForeignKey(() => Order)
  @PrimaryKey
  @Column
  public orderId!: string;

  @ForeignKey(() => Product)
  @PrimaryKey
  @Column
  public productId!: string;

  @Column({
      allowNull: false,
      type: DataType.SMALLINT,
  })
  public count!: number;
}
