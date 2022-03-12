import User from '../../../database/models/final/user.model';
import { RoleTypes } from '../../../utils/constants';
import { throwError } from '../../../utils/http-exception';
import { UserUpdateDto } from '../../dto/user-update.dto';

export default class SaClientsService {
  static async getClients() {
    let clientList = await User.findAll({
      where: {
        role: RoleTypes.USER,
      },
    });

    return clientList;
  }

  static async getClientById(clientId: string) {
    let client = await User.findByPk(clientId);

    if (!client)
      throwError({
        statusCode: 404,
        message: 'Not found',
      });

    return client;
  }

  static async blockCLient(clientId: string) {
    let client = await User.findByPk(clientId);

    if (!client || client.role != RoleTypes.USER)
      throwError({
        statusCode: 404,
        message: 'Not found',
      });

    if (client.isBlocked == true)
      throwError({
        statusCode: 400,
        message: 'Client already blocked',
      });

    client.isBlocked = true;
    await client.save(); //update

    return client;
  }

  static async unblockClient(clientId: string) {
    let client = await User.findByPk(clientId);

    if (!client || client.role != RoleTypes.USER)
      throwError({
        statusCode: 404,
        message: 'Not found',
      });

    if (client.isBlocked == false)
      throwError({
        statusCode: 400,
        message: 'Client is not blocked',
      });

    client.isBlocked = false;
    await client.save(); //update

    return client;
  }

  static async updateClient(clientId: string, dto: UserUpdateDto){
    let client = await User.findByPk(clientId);

    if (!client || client.role != RoleTypes.USER)
      throwError({
        statusCode: 404,
        message: 'Not found',
      });

      client.set(dto);
      await client.save(); //update

      return client;
  }


}
