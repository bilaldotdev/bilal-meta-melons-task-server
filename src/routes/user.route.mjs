import { Router } from 'express';
import { getUserById, getUsers } from '../controller/user.controller.mjs';
import { sendResponse } from '../utils/helpers.mjs';

const userRouter = Router();

userRouter.get('/list', async (req, res) => {
  const result = await getUsers(req.params.userId);
  sendResponse(result, res);
});

userRouter.get('/:userId', async (req, res) => {
  const result = await getUserById(req.params.userId);
  sendResponse(result, res);
});

export default userRouter;
