import Address from '../../../database/models/final/address.model';
import Rating from '../../../database/models/final/rating.model';
import Store from '../../../database/models/final/store.model';
import User from '../../../database/models/final/user.model';
import UserAddress from '../../../database/models/relations/user-address.model';
import { throwError } from '../../../utils/http-exception';
import { AddressCreateDto } from '../../dto/address-create.dto';
import { AddressUpdateDto } from '../../dto/address-update.dto';
import { UserUpdateDto } from '../../dto/user-update.dto';

export default class ApiUsersService {
  static async getUser(userId: string) {
    const user = await User.findByPk(userId);
    if (!user) {
      throwError({
        statusCode: 404,
        message: 'Not found.',
      });
    }
    return user;
  }

  static async updateUser(dto: UserUpdateDto) {
    const user = await User.findByPk(dto.userId);
    if (!user) {
      throwError({
        statusCode: 404,
        message: 'Not found.',
      });
    }
    await user.update(dto);
    return user;
  }

  static async getUserRatingList(userId: string) {
    const ratingList = await Rating.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: Store,
          duplicating: false,
        },
      ],
    });
    return { ratingList: ratingList };
  }

  static async getAddressList(userId: string) {
    const user = await User.findByPk(userId, {
      include: {
        model: Address,
        through: {
          attributes:['addressId'],
        }
      },
    });

    if (!user) {
      throwError({
        statusCode: 404,
        message: 'Not found.',
      });
    }
    return { addressList: user.addressList };
  }

  static async createAddress(dto: AddressCreateDto) {
    const address = await Address.create(dto);
    await UserAddress.create({
      userId: dto.userId,
      addressId: address.id,
    });
    return address;
  }

  static async updateAddress(dto: AddressUpdateDto) {
    const address = await Address.findByPk(dto.addressId, {
      include: {
        model: User,
      }
    });
    if (!address || address.userList[0].id !== dto.userId) {
      throwError({
        statusCode: 404,
        message: 'Not found.',
      });
    }
    await address.update(dto);
    return await Address.findByPk(dto.addressId);
  }
}
