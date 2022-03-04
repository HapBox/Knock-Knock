import { Request } from 'express';

export default interface BaseRequest extends Request {
  xAccessToken: string;
  value: string;
  token: string;
  userId: string;
}
