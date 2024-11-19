import bcrypt from 'bcrypt';

export const getHashed = (input = '') => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(input, salt);
  return hash;
};

/**
 * @argument {{ data?: any; error?: any }} result
 * @argument {Response} response
 */
export function sendResponse(result, response) {
  if (result?.data) {
    return response.json({ data: result.data });
  }

  return response.status(400).json({ error: result?.error });
}

export const parseSequelizeErrors = (errors = []) => {
  return errors?.map(item => ({
    key: item?.path,
    message: item?.message,
    value: item?.value,
  }));
};
