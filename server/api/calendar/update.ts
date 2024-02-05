import { increment, decrement } from '../../data/calendar';

export default defineEventHandler(async (event) => {
  let id;
  const body = await readBody(event);
  if (body && body.id) {
    id = parseInt(body);
  }

  if (body && body.count < 0) {
    const user = await decrement({ ...body, id });
    return user;
  }
  const user = await increment({ ...body, id });
  return user;
});
