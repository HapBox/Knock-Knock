import User from '../../../database/models/final/user.model';
import { RoleTypes } from '../../../utils/constants';
import { throwError } from '../../../utils/http-exception';
import { UserUpdateDto } from '../../dto/user-update.dto';

export default class SaClientsService {
  static async getClients() {
    const clientList = await User.findAll({
      where: {
        role: RoleTypes.USER,
      },
    });

    return { clientList: clientList };
  }

  static async getClientById(clientId: string) {
    const client = await User.findByPk(clientId);

    if (!client)
      throwError({
        statusCode: 404,
        message: 'Client not found',
      });

    return client;
  }

  static async blockCLient(clientId: string) {
    let client = await User.findOne({
      where: {
        id: clientId,
        role: RoleTypes.USER,
      },
    });

    if (!client)
      throwError({
        statusCode: 404,
        message: 'Client not found',
      });

    if (client.isBlocked == true)
      throwError({
        statusCode: 400,
        message: 'Client already blocked',
      });

    await client.update({
      isBlocked: true,
    });

    return client;
  }

  static async unblockClient(clientId: string) {
    let client = await User.findOne({
      where: {
        id: clientId,
        role: RoleTypes.USER,
      },
    });

    if (!client)
      throwError({
        statusCode: 404,
        message: 'Client not found',
      });

    if (client.isBlocked == false)
      throwError({
        statusCode: 400,
        message: 'Client is not blocked',
      });

    await client.update({
      isBlocked: false,
    });

    return client;
  }

  static async updateClient(dto: UserUpdateDto) {
    let client = await User.findOne({
      where: {
        id: dto.userId,
        role: RoleTypes.USER,
      },
    });

    if (!client)
      throwError({
        statusCode: 404,
        message: 'Client not found',
      });

    await client.update({
      ...dto,
    });

    return client;
  }
}
