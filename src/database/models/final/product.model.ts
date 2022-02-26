import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import OrderProduct from '../relations/order-product.model';
import Category from './category.model';
import Filial from './filial.model';
import Order from './order.model';
import Promotion from './promotion.model';

@Table({
  timestamps: true,
})
export default class Product extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
    primaryKey: true,
  })
  public id!: string;

  @Column({
    allowNull: false,
  })
  public name!: string;

  @Column({
    allowNull: false,
  })
  public description!: string;

  @Column({
    allowNull: false,
  })
  public price!: number;

  @Column({
      allowNull: false
  })
  public image!: string; //продумать image

  @ForeignKey(() => Category)
  public categoryId!: string;

  @BelongsTo(() => Category, 'categoryId')
  public category!: Category;

  @ForeignKey(() => Promotion)
  public promotionId!: string;

  @BelongsTo(() => Promotion, 'promotionId')
  public promotion!: Promotion;

  @ForeignKey(() => Filial)
  public filialId!: string;
  
  @BelongsTo(() => Filial, 'filialId')
  public filial!: Filial;

  @BelongsToMany(() => Order, () => OrderProduct)
  public orderList!: Order[];
}
