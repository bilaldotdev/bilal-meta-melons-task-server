import jwt from 'jsonwebtoken';
import { getUserById } from '../controller/user.controller.mjs';
import { JWT_TOKEN_SECRET } from '../config/index.mjs';

const addUserToRequestMiddleware = async (request, resp, next) => {
  let bearerToken = request.headers['authorization'] || '';

  if (!bearerToken) {
    next();
    return;
  }

  let token = bearerToken?.split('Bearer ')[1];

  try {
    const result = jwt.decode(token);
    if (typeof result === 'object' && result?.id) {
      const user = await getUserById(result.id);
      // attach password to invalidate user token later.
      const verified = jwt.verify(token, `${JWT_TOKEN_SECRET}${user?.data?.password}`);

      if (typeof verified === 'object' && verified?.id && user) {
        request.user = user?.data;
      }
    }
  } catch (error) {
    console.error(error, '--err');
  }

  next();
};

export default addUserToRequestMiddleware;
