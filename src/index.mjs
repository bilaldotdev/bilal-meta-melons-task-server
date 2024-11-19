import cors from 'cors';
import express from 'express';
import { config } from 'dotenv';
import { SERVER_PORT } from './config/index.mjs';
import { initDB } from './lib/connect-db.mjs';
import userRouter from './routes/user.route.mjs';
import authRouter from './routes/auth.route.mjs';
import addUserToRequestMiddleware from './middleware/addRequestUserMiddleware.mjs';
import authMiddleWare from './middleware/authMIddleware.mjs';
import taskRouter from './routes/task.route.mjs';

// load env
config();

const app = express();

const corsMiddleware = cors({ origin: ['http://localhost:3000', 'http://localhost:5173'] });

// apply middleware
app.use([corsMiddleware, express.json(), express.urlencoded({ extended: true })]);

// load routes
app.use('/api/secure', [addUserToRequestMiddleware, authMiddleWare]);

app.use('/api/auth', authRouter);

// app.use('/api/secure/users', userRouter);

app.use('/api/secure/tasks', taskRouter);

(async () => {
  // connect DB
  const instance = await initDB();

  if (instance) {
    app.listen(SERVER_PORT, () => {
      console.log('server up!');
    });
  }
})();
