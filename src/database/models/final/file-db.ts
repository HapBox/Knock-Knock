import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { FileTypes } from '../../../utils/constants';
import { getFileVirtualUrl } from '../../../utils/utils-file';

@Table({
  timestamps: true,
})
export default class FileDB extends Model {
  @Column({
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
    primaryKey: true,
  })
  public id!: string;

  @Column({
    type: DataType.STRING,
    //allowNull: false
  })
  public extension!: string;

  @Column({
    type: DataType.INTEGER,
    //allowNull: false
  })
  public size!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public originalName!: string;

  @Column({
    type: DataType.ENUM({ values: Object.values(FileTypes) }),
    allowNull: false,
  })
  public type!: string;

  @Column(DataType.VIRTUAL)
  get url() {
    return getFileVirtualUrl(this.type, this.id, this.extension);
  }
}
