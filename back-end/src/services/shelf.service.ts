import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addBookToShelf(userId: string, bookId: string, status: string) {
  return prisma.userBook.upsert({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    },
    update: {
      status,
    },
    create: {
      userId,
      bookId,
      status,
      pagesRead: 0,
    },
  });
}

