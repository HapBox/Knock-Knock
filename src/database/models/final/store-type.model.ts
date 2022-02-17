import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import Store from './store.model';

@Table({
  timestamps: true,
})
export default class StoreType extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
    primaryKey: true,
  })
  public id!: string;

  @Column({
    allowNull: false,
  })
  public value!: string;

  @HasMany(() => Store, 'storeTypeId')
  public storeList!: Store[];
}
