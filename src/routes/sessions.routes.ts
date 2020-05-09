import { Router } from 'express';

import CreateNewSessionService from '../services/CreateNewSessionService';

const sessionRouter = Router();

sessionRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const createNewSessionService = new CreateNewSessionService();

    const { user, token } = await createNewSessionService.execute({
      email,
      password,
    });

    return res.status(200).json({ token, user });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

export default sessionRouter;
