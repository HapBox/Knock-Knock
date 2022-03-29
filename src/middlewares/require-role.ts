import { NextFunction, Response } from 'express';
import User from '../database/models/final/user.model';
import BaseRequest from '../modules/base/base.request';
import { RoleTypes } from '../utils/constants';
import { throwError } from '../utils/http-exception';

export const requireRole = async (req: BaseRequest, res: Response, next: NextFunction) => {
  const user = await User.findOne({
    where: {
      id: req.userId,
    },
  });

  if (!user) {
    throwError({
      statusCode: 404,
      message: 'User not found (Middleware requireRole)',
    });
  }

  if (user.role === RoleTypes.USER) {
    throwError({
      statusCode: 403,
      message: 'Forbidden',
    });
  }

  if (user.role === RoleTypes.STOREWORKER) {
    req.workStoreId = user.workStoreId;
  }

  req.userRole = user.workStoreId;
  next();
};
