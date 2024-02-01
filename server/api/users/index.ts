import { defineEventHandler } from 'h3';
import { getUsers } from '../../data/users';

export default defineEventHandler(async () => {
  return await getUsers();
});
