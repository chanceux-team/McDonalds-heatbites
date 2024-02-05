import dayjs from 'dayjs';
import prisma from '../index';

export async function get() {
  const users = await prisma.calendar.findMany({
    take: 365,
  });
  return users;
}

async function getDateOrCreate({ count, date }: { count?: number; date?: string }) {
  const formattedDate = dayjs(date).format('YYYY-MM-DD');
  let calendarEntry = await prisma.calendar.findFirst({
    where: {
      date: formattedDate,
    },
  });

  if (!calendarEntry) {
    calendarEntry = await prisma.calendar.create({
      data: {
        date: formattedDate,
        count: count || 1,
      },
    });
  }

  return calendarEntry;
}

async function updateCount({ id, count, date, operation }: { id?: number; count?: number; date?: string; operation: 'increment' | 'decrement' }) {
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
    const updateDate = await getDateOrCreate({ count, date });
    result = await prisma.calendar.update({
      data: {
        count: {
          [operation]: count || 1,
        },
      },
      where: {
        date: updateDate.date,
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
