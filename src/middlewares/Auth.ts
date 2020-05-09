import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import configAuth from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function Auth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('Is token not found');
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, configAuth.jwt.secret);

    const { sub } = decoded as TokenPayload;

    req.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new Error('Is token invalid');
  }
}
