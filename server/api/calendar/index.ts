import { get } from '../../data/canlendar';

export default defineEventHandler(async () => {
  return await get();
});
