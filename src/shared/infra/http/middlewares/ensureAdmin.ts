import { NextFunction, Request, Response } from 'express';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = request.user;
  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user.is_admin) {
    throw new AppError("User isn't admin", 401);
  }

  return next();
}
