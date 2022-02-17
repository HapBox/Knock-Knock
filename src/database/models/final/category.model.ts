import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import Product from './product.model';

@Table({
  timestamps: false,
})
export default class Category extends Model {
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
  public image!: string; //продумать image

  @HasMany(() => Product, 'categoryId')
  public productList!: Product[];
}
