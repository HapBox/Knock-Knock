import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import OrderProduct from '../relations/order-product.model';
import Category from './category.model';
import FileDB from './file-db.model';
import Order from './order.model';
import Promotion from './promotion.model';
import Store from './store.model';

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

  @ForeignKey(() => FileDB)
  public imageId!: string;

  @BelongsTo(() => FileDB, 'imageId')
  public image!: FileDB;

  @ForeignKey(() => Category)
  public categoryId!: string;

  @BelongsTo(() => Category, 'categoryId')
  public category!: Category;

  @ForeignKey(() => Promotion)
  public promotionId!: string;

  @BelongsTo(() => Promotion, 'promotionId')
  public promotion!: Promotion;

  @ForeignKey(() => Store)
  public storelId!: string;
  
  @BelongsTo(() => Store, 'storelId')
  public store!: Store;

  @BelongsToMany(() => Order, () => OrderProduct)
  public orderList!: Order[];
}
