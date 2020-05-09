import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

import configAuth from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateNewSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect input.');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Incorrect input.');
    }

    delete user.password;

    const token = sign({}, configAuth.jwt.secret, {
      subject: user.id,
      expiresIn: configAuth.jwt.expiresIn,
    });
    return {
      user,
      token,
    };
  }
}

export default CreateNewSessionService;
