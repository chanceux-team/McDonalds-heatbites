import { defineEventHandler, readBody } from 'h3';
import { createUser } from '../../data/users';

export default defineEventHandler(async (event) => {
  const { name, email } = await readBody(event);
  // if (!name || !email) {
  //   throw createError({
  //     statusCode: 400,
  //     statusMessage: 'Bad Request',
  //   })
  // }
  const user = await createUser(name, email);
  return user;
});
