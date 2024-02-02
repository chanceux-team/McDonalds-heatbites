import { update } from '../../data/canlendar';

export default defineEventHandler(async (event) => {
  let id;
  const body = await readBody(event);
  if (body && body.id) {
    id = parseInt(body);
  }
  const user = await update(id);
  return user;
});
