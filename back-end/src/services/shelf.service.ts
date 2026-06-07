import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const inMemoryUserBooks: any[] = [];

export async function addBookToShelf(userId: string, bookId: string, status: string) {
  try {
    return await prisma.userBook.upsert({
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
  } catch (err) {
    const existing = inMemoryUserBooks.find((ub) => ub.userId === userId && ub.bookId === bookId);
    if (existing) {
      existing.status = status;
      existing.updatedAt = new Date();
      return existing;
    }
    const item = { id: `ub-${Date.now()}`, userId, bookId, status, pagesRead: 0, createdAt: new Date(), updatedAt: new Date() };
    inMemoryUserBooks.push(item);
    return item;
  }
}

