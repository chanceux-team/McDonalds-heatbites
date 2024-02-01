import prisma from '../index';

export async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function createUser(name: string, email: string) {
  let result = null;
  result = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  return result;
}
