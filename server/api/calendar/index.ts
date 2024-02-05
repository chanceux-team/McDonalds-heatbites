import { get } from '../../data/calendar';

export default defineEventHandler(async () => {
  return await get();
});
