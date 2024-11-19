import { Router } from 'express';
import { sendResponse } from '../utils/helpers.mjs';
import {
  createTask,
  delTaskById,
  getTaskById,
  getTasks,
  updateTaskById,
} from '../controller/task.controller.mjs';

const taskRouter = Router();

taskRouter.post('/create', async (req, res) => {
  const userId = req?.user?.id;
  const result = await createTask(req.body, userId);

  sendResponse(result, res);
});

taskRouter.get('/list', async (req, res) => {
  const result = await getTasks(req.user.id);
  sendResponse(result, res);
});

taskRouter.delete('/delete/:taskId', async (req, res) => {
  const result = await delTaskById(req.params.taskId);
  sendResponse(result, res);
});

taskRouter.patch('/update/:taskId', async (req, res) => {
  const result = await updateTaskById(req.params.taskId, req.body);
  sendResponse(result, res);
});

/* keep at last to avoid mismatch */
taskRouter.get('/:taskId', async (req, res) => {
  const result = await getTaskById(req.params.taskId);
  sendResponse(result, res);
});

export default taskRouter;
