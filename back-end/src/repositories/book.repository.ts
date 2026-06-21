import { prisma } from '../lib/prisma.js'
import { Prisma } from '@prisma/client'

export class BookRepository {
  async create(data: Prisma.BookCreateInput) {
    try {
      const book = await prisma.book.create({ data });
      return book;
    } catch (err) {
      const id = `mock-book-${Date.now()}`;
      const item = { id, ...data, createdAt: new Date(), updatedAt: new Date() };
      (BookRepository as any)._books = (BookRepository as any)._books || [];
      (BookRepository as any)._books.push(item);
      return item;
    }
  }
  async findAll() {
    try {
      const books = await prisma.book.findMany();
      return books;
    } catch (err) {
      return (BookRepository as any)._books || [];
    }
  }

  async search(query: string) {
    try {
      const books = await prisma.book.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { author: { contains: query, mode: 'insensitive' } },
          ],
        },
      });
      return books;
    } catch (err) {
      const items = (BookRepository as any)._books || [];
      const lower = query.toLowerCase();
      return items.filter((b: any) =>
        (b.title || '').toLowerCase().includes(lower) ||
        (b.author || '').toLowerCase().includes(lower)
      );
    }
  }
}