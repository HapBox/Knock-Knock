import User from '../../../database/models/final/user.model';
import { RoleTypes } from '../../../utils/constants';
import { throwError } from '../../../utils/http-exception';
import { UserCreateDto } from '../../dto/user-create.dto';
import { UserUpdateDto } from '../../dto/user-update.dto';

export default class SaAdminsService {
  static async getAdmins() {
    const adminList = await User.findAll({
      where: {
        role: RoleTypes.ADMIN,
      },
    });

    return adminList;
  }

  static async getAdminById(adminId: string) {
    const admin = await User.findOne({
      where: {
        id: adminId,
        role: RoleTypes.ADMIN,
      },
    });

    if (!admin)
      throwError({
        statusCode: 404,
        message: 'Admin not found',
      });

    return admin;
  }

  static async updateAdmin(dto: UserUpdateDto) {
    let admin = await User.findOne({
      where: {
        id: dto.userId,
        role: RoleTypes.ADMIN,
      },
    });

    if (!admin)
      throwError({
        statusCode: 404,
        message: 'Admin not found',
      });

    await admin.update({
      ...dto,
    });

    return admin;
  }

  static async blockAdmin(adminId: string) {
    let admin = await User.findOne({
      where: {
        id: adminId,
        role: RoleTypes.ADMIN,
      },
    });

    if (!admin)
      throwError({
        statusCode: 404,
        message: 'Admin not found',
      });

    if (admin.isBlocked == true)
      throwError({
        statusCode: 400,
        message: 'Admin already blocked',
      });

    await admin.update({
      isBlocked: true,
    });

    return admin;
  }

  static async unblockAdmin(adminId: string) {
    let admin = await User.findOne({
      where: {
        id: adminId,
        role: RoleTypes.ADMIN,
      },
    });

    if (!admin)
      throwError({
        statusCode: 404,
        message: 'Admin not found',
      });

    if (admin.isBlocked == false)
      throwError({
        statusCode: 400,
        message: 'Admin is not blocked',
      });

    await admin.update({
      isBlocked: false,
    });

    return admin;
  }

  static async createAdmin(dto: UserCreateDto) {
    let admin = await User.findOne({
      where: {
        phone: dto.phone,
      },
    });

    if (admin)
      throwError({
        statusCode: 400,
        message: 'Phone already registered',
      });
    admin = await User.create({
      ...dto,
    });

    return admin;
  }

  static async dismissAdmin(adminId: string) {
    let admin = await User.findOne({
      where: {
        id: adminId,
        role: RoleTypes.ADMIN,
      },
    });

    if (!admin)
      throwError({
        statusCode: 404,
        message: 'Admin not found',
      });

    await admin.update({
      role: RoleTypes.USER,
      workStoreId: '',
    });

    return admin;
  }
}
