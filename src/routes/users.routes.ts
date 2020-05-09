import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';

import AuthMiddleware from '../middlewares/Auth';

import uploadConfig from '../config/upload';

const upload = multer(uploadConfig);
const userRouter = Router();

userRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

userRouter.patch(
  '/avatar',
  AuthMiddleware,
  upload.single('avatar'),
  async (req, res) => {
    console.log(req.file);
    return res.status(200).json({ message: 'Ok' });
  }
);

export default userRouter;
