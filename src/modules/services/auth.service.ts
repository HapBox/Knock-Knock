import { nanoid } from 'nanoid';
import SmsConfirm from '../../database/models/final/sms-cofirm.model';
import Token from '../../database/models/final/token.model';
import User from '../../database/models/final/user.model';
import { Constants } from '../../utils/constants';
import { throwError } from '../../utils/http-exception';
import { PhoneAuthDto } from '../dto/phone-auth.dto';
import { PhoneConfirmDto } from '../dto/phone-confirm.dto';

export default class AuthService {
  static async phoneLoginStart(dto: PhoneAuthDto) {
    const smsConfirm = await SmsConfirm.findOne({
      where: {
        phone: dto.phone,
      },
    });

    if (smsConfirm) smsConfirm.destroy();

    let code: string = '';

    for (let i = 0; i < 6; i++) {
      code += Math.floor(Math.random() * 10);
    }

    await SmsConfirm.create({
      phone: dto.phone,
      code: code,
    });
    return code;
  }

  static async phoneLoginConfirm(dto: PhoneConfirmDto) {
    const smsConfirm = await SmsConfirm.findOne({
      where: {
        phone: dto.phone,
        code: dto.code,
      },
    });

    if (!smsConfirm) {
      throwError({
        statusCode: 400,
        message: 'Wrong data.',
      });
    }

    await smsConfirm.destroy();

    let user = await User.findOne({
      where: {
        phone: dto.phone,
      },
    });

    if (!user) {
      user = await User.create({
        phone: dto.phone,
      });
    }

    if (user.isBlocked === true) {
      throwError({
        statusCode: 403,
        message: 'Вы забанены',
      });
    }

    const token = await Token.create({
      userId: user.id,
      value: nanoid(Constants.TOKEN_LENGHT),
    });
    return token;
  }

  static async logout(tokenValue: string) {
    await Token.destroy({
      where: {
        value: tokenValue,
      },
    });
    return { message: 'Logout succesfull' };
  }
}
