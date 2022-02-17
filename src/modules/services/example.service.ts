import Item from '../../database/models/final/category.model';
import { throwError } from '../../utils/http-exception';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';

export default class ExampleService {
  static async getItems(): Promise<Item[]> {
    return await Item.findAll();
  }

  static async getItemById(id: string): Promise<Item> {
    const item = await Item.findByPk(id);

    if (!item) {
      throwError({
        statusCode: 404,
        message: `Item with id# ${id} was not found`,
      });
    }

    return item;
  }

  static async createItem(dto: CreateItemDto): Promise<Item> {
    const item = await Item.create(dto);

    return item;
  }

  static async updateItem(id: string, dto: UpdateItemDto): Promise<Item> {
    const item = await this.getItemById(id);

    await item.update(dto);

    return item;
  }

  static async deleteItem(id: string) {
    const item = await this.getItemById(id);

    await item.destroy();
  }
}
