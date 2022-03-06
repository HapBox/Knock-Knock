import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import FileDB from './file-db.model';
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

  @ForeignKey(() => FileDB)
  public imageId!: string;

  @BelongsTo(() => FileDB, 'imageId')
  public image!: FileDB;

  @HasMany(() => Product, 'categoryId')
  public productList!: Product[];
}
