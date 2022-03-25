import Address from '../../../database/models/final/address.model';
import { throwError } from '../../../utils/http-exception';
import { AddressCreateDto } from '../../dto/address-create.dto';
import { AddressUpdateDto } from '../../dto/address-update.dto';
//переедет в api
export default class SaAddressesService {
  static async createAddress(dto: AddressCreateDto) {
    const address = await Address.create(dto);
    return address;
  }

  static async patchAddress(dto: AddressUpdateDto) {
    const address = await Address.findByPk(dto.addressId);

    if (!address)
      throwError({
        statusCode: 404,
        message: 'Address not found',
      });

    await address.update({
      ...dto,
    });
    return address;
  }

  static async deleteAddress(addressId: string) {
    const address = await Address.findByPk(addressId);

    if (!address)
      throwError({
        statusCode: 404,
        message: 'Address not found',
      });

    await address.destroy();
    return { message: 'Delete succesfull' };
  }
}
