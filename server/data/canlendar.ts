import dayjs from 'dayjs';
import prisma from '../index';

export async function get() {
  const users = await prisma.calendar.findMany({
    take: 365,
  });
  return users;
}

export async function update(id?: number) {
  let result = null;
  if (id) {
    result = await prisma.calendar.update({
      data: {
        count: {
          increment: 1,
        },
      },
      where: {
        id,
      },
    });
  } else {
    const today = await prisma.calendar.findFirst({
      where: {
        date: dayjs().format('YYYY-MM-DD'),
      },
    });
    if (!today) {
      result = await prisma.calendar.create({
        data: {
          date: dayjs().format('YYYY-MM-DD'),
          count: 1,
        },
      });
    } else {
      result = await prisma.calendar.update({
        data: {
          count: {
            increment: 1,
          },
        },
        where: {
          date: dayjs().format('YYYY-MM-DD'),
        },
      });
    }
  }
  return result;
}
