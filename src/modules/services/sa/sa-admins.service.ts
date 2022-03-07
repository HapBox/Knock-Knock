import { and, Op } from 'sequelize/types';
import User from '../../../database/models/final/user.model';
import { RoleTypes } from '../../../utils/constants';
import { throwError } from '../../../utils/http-exception';
import { UserCreateDto } from '../../dto/user-create.dto';
import { UserUpdateDto } from '../../dto/user-update.dto';

export default class SaAdminsService {
  static async getAdmins() {
    let adminList = await User.findAll({
      where: {
        role: RoleTypes.ADMIN,
      },
    });

    return adminList;
  }

  static async getAdminById(adminId: string) {
    let admin = await User.findByPk(adminId);

    if (!admin || admin.role != RoleTypes.ADMIN)
      throwError({
        statusCode: 404,
        message: 'Not found',
      });

    return admin;
  }

  static async updateAdmin(adminId: string, dto: UserUpdateDto) {
    let admin = await User.findByPk(adminId);

    if (!admin || admin.role != RoleTypes.ADMIN)
      throwError({
        statusCode: 404,
        message: 'Not found',
      });

    admin.set(dto);
    await admin.save();
    
    return admin;
  }

  static async blockAdmin(adminId: string) {
    let admin = await User.findByPk(adminId);

    if (!admin || admin.role != RoleTypes.ADMIN)
      throwError({
        statusCode: 404,
        message: 'Not found',
      });

    if (admin.isBlocked == true)
      throwError({
        statusCode: 400,
        message: 'Admin already blocked',
      });

    admin.isBlocked = true;
    await admin.save();

    return admin;
  }

  static async unblockAdmin(adminId: string) {
    let admin = await User.findByPk(adminId);

    if (!admin || admin.role != RoleTypes.ADMIN)
      throwError({
        statusCode: 404,
        message: 'Not found',
      });

    if (admin.isBlocked == false)
      throwError({
        statusCode: 400,
        message: 'Admin is not blocked',
      });

    admin.isBlocked = false;
    await admin.save();

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
    admin = await User.create(dto);

    return admin;
  }

  static async dismissAdmin(adminId: string) {
    let admin = await User.findByPk(adminId);

    if (!admin || admin.role != RoleTypes.ADMIN)
      throwError({
        statusCode: 404,
        message: 'Not found',
      });

    admin.role = RoleTypes.USER;
    admin.workStoreId = '';
    await admin.save();

    return admin;
  }
}
