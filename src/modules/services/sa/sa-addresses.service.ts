import { Op } from 'sequelize/types';
import Address from '../../../database/models/final/address.model';
import { throwError } from '../../../utils/http-exception';
import { AddressCreateDto } from '../../dto/address-create.dto';
import { AddressUpdateDto } from '../../dto/address-update.dto';

export default class SaAddressesService {
  static async getAddresses() {
    let addressList = await Address.findAll();
    return addressList;
  }

  static async getAddressById(addressId: string) {
    let address = await Address.findByPk(addressId);

    if (!address)
      throwError({
        statusCode: 404,
        message: 'Not found',
      });

    return address;
  }

  static async createAddress(dto: AddressCreateDto) {
    let address = await Address.findOne({
      where: {
        [Op.or]: [
          { city: dto.city }, 
          { street: dto.street }, 
          { house: dto.house }],
      },
    });

    if (address)
      throwError({
        statusCode: 400,
        message: 'Address already exists',
      });

    address = await Address.create(dto);
    return address;
  }

  static async patchAddress(addressId: string, dto: AddressUpdateDto) {
    let address = await Address.findByPk(addressId);

    if (!address)
      throwError({
        statusCode: 404,
        message: 'Not found',
      });

    address.set(dto);
    await address.save();
    return address;
  }

  static async deleteAddress(addressId: string) {
    let address = await Address.findByPk(addressId);

    if (!address)
      throwError({
        statusCode: 404,
        message: 'Not found',
      });

    await address.destroy();
  }
}
