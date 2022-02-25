import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import Product from './product.model';

@Table({
  timestamps: true,
})
export default class Promotion extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
    primaryKey: true,
  })
  public id!: string;

  @Column({
    type: DataType.SMALLINT,
    allowNull: false,
  })
  public discountPercent!: number;

  @Column({
    allowNull: false,
  })
  public dateToEnd!: Date;

  @HasOne(() => Product, 'promotionId')
  public product!: Product;
}
