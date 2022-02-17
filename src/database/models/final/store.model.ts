import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import Filial from './filial.model';
import Rating from './rating.model';
import StoreType from './store-type.model';

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

  @ForeignKey(() => StoreType)
  public storeTypeId!: string;

  @BelongsTo(() => StoreType, 'storeTypeId')
  public storeType!: StoreType;

  @HasMany(() => Filial, 'storeId')
  public filialList!: Filial[];

  @HasMany(() => Rating, 'storeId')
  public ratingList!: Rating[];
}
