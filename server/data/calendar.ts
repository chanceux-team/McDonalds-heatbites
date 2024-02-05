import dayjs from 'dayjs';
import prisma from '../index';

export async function get() {
  const users = await prisma.calendar.findMany({
    take: 365,
  });
  return users;
}

async function getTodayOrCreate(count: number | undefined) {
  let today = await prisma.calendar.findFirst({
    where: {
      date: dayjs().format('YYYY-MM-DD'),
    },
  });
  if (!today) {
    today = await prisma.calendar.create({
      data: {
        date: dayjs().format('YYYY-MM-DD'),
        count: count || 1,
      },
    });
  }
  return today;
}

async function updateCount({ id, count, operation }: { id?: number; count?: number; operation: 'increment' | 'decrement' }) {
  let result = null;
  if (id) {
    result = await prisma.calendar.update({
      data: {
        count: {
          [operation]: count || 1,
        },
      },
      where: {
        id,
      },
    });
  } else {
    const today = await getTodayOrCreate(count);
    result = await prisma.calendar.update({
      data: {
        count: {
          [operation]: count || 1,
        },
      },
      where: {
        date: today.date,
        ...(operation === 'decrement' && { count: { gte: count } }),
      },
    });
  }
  return result;
}

export async function increment(data: { id?: number; count?: number }) {
  return updateCount({ ...data, operation: 'increment' });
}

export async function decrement(data: { id?: number; count?: number }) {
  data.count = data.count && Math.abs(data.count);
  return updateCount({ ...data, operation: 'decrement' });
}
