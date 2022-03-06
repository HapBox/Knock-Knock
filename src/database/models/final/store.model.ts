import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import FileDB from './file-db.model';
import Filial from './filial.model';
import Rating from './rating.model';

@Table({
  timestamps: true,
})
export default class Store extends Model {
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
  public phone!: string;

  @ForeignKey(() => FileDB)
  public imageId!: string;

  @BelongsTo(() => FileDB, 'imageId')
  public image!: FileDB;

  @HasMany(() => Filial, 'storeId')
  public filialList!: Filial[];

  @HasMany(() => Rating, 'storeId')
  public ratingList!: Rating[];
}
