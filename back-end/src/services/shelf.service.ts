import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const inMemoryUserBooks: any[] = [];

export async function addBookToShelf(userId: string, bookId: string, status: string, pagesRead: number = 0) {
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
        pagesRead,
      },
      create: {
        userId,
        bookId,
        status,
        pagesRead,
      },
    });
  } catch (err) {
    const existing = inMemoryUserBooks.find((ub) => ub.userId === userId && ub.bookId === bookId);
    if (existing) {
      existing.status = status;
      existing.pagesRead = pagesRead;
      existing.updatedAt = new Date();
      return existing;
    }
    const item = { id: `ub-${Date.now()}`, userId, bookId, status, pagesRead, createdAt: new Date(), updatedAt: new Date() };
    inMemoryUserBooks.push(item);
    return item;
  }
}

export async function getUserShelf(userId: string) {
  try {
    return await prisma.userBook.findMany({
      where: { userId },
      include: { book: true },
      orderBy: { updatedAt: "desc" },
    });
  } catch (err) {
    return inMemoryUserBooks.filter((ub) => ub.userId === userId);
  }
}

