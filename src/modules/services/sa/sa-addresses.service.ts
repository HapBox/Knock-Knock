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
