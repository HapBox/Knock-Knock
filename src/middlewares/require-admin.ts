import { NextFunction, Response } from 'express';
import User from '../database/models/final/user.model';
import BaseRequest from '../modules/base/base.request';
import { RoleTypes } from '../utils/constants';
import { throwError } from '../utils/http-exception';

export const requireAdmin = async (req: BaseRequest, res: Response, next: NextFunction) => {
  const user = await User.findByPk(req.userId);

  if (!user) {
    throwError({
      statusCode: 404,
      message: 'User not found (Middleware requireAdmin)',
    });
  }

  if (user.role !== RoleTypes.ADMIN) {
    throwError({
      statusCode: 403,
      message: 'Forbidden',
    });
  }

  next();
};
