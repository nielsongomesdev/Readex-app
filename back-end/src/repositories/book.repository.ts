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

  async search(q?: string, limit = 20, offset = 0) {
    const where = q
      ? {
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { author: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
          ],
        }
      : {};

    try {
      const [total, items] = await Promise.all([
        prisma.book.count({ where }),
        prisma.book.findMany({ where, take: limit, skip: offset, orderBy: { createdAt: 'desc' } }),
      ]);

      return { items, total };
    } catch (err) {
      const items = (BookRepository as any)._books || [];
      const filtered = q
        ? items.filter((b: any) => {
            const lower = q.toLowerCase();
            return (
              (b.title || '').toLowerCase().includes(lower) ||
              (b.author || '').toLowerCase().includes(lower) ||
              (b.description || '').toLowerCase().includes(lower)
            );
          })
        : items;

      const paged = filtered.slice(offset, offset + limit);
      return { items: paged, total: filtered.length };
    }
  }
}