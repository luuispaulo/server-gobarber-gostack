import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email addres already used.');
    }

    const passwordHash = await hash(password, 6);
    const user = userRepository.create({ name, email, password: passwordHash });

    await userRepository.save(user);

    delete user.password;

    return user;
  }
}

export default CreateUserService;
