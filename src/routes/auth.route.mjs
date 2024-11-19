import { Router } from 'express';
import { signIn } from '../controller/auth.controller.mjs';
import { sendResponse } from '../utils/helpers.mjs';
import { createUser } from '../controller/user.controller.mjs';

const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  const result = await signIn(req.body);

  sendResponse(result, res);
});

authRouter.post('/create-user', async (req, res) => {
  const result = await createUser(req.body);

  sendResponse(result, res);
});

export default authRouter;
