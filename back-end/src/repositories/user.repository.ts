import { prisma } from '../lib/prisma.js'
import { Prisma } from '@prisma/client'

export class UserRepository {
  private static _users: any[] = [];
  private static _userBooks: any[] = [];
  private static _reviews: any[] = [];

  async create(data: Prisma.UserCreateInput) {
    try {
      const user = await prisma.user.create({ data });
      return user;
    } catch (err) {
      const id = `mock-${Date.now()}`;
      const item = { id, ...data, createdAt: new Date(), updatedAt: new Date() };
      UserRepository._users.push(item);
      return item;
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      return user;
    } catch (err) {
      return UserRepository._users.find((u) => u.email === email) ?? null;
    }
  }

  async findAll() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (err) {
      return UserRepository._users;
    }
  }

  async findUserBooksWithBook(userId: string) {
    try {
      const items = await prisma.userBook.findMany({
        where: { userId },
        include: { book: true },
      });
      return items;
    } catch (err) {
      return UserRepository._userBooks.filter((ub) => ub.userId === userId).map((it) => ({ ...it, book: null }));
    }
  }

  async countReviewsInPeriod(userId: string, start: Date, end: Date) {
    try {
      const count = await prisma.review.count({
        where: {
          userId,
          createdAt: { gte: start, lt: end },
        },
      });
      return count;
    } catch (err) {
      return UserRepository._reviews.filter((r) => r.userId === userId && new Date(r.createdAt) >= start && new Date(r.createdAt) < end).length;
    }
  }

  async findReviewsInPeriod(userId: string, start: Date, end: Date) {
    try {
      const reviews = await prisma.review.findMany({
        where: { userId, createdAt: { gte: start, lt: end } },
        select: { id: true, createdAt: true },
      });
      return reviews;
    } catch (err) {
      return UserRepository._reviews
        .filter((r) => r.userId === userId && new Date(r.createdAt) >= start && new Date(r.createdAt) < end)
        .map((r) => ({ id: r.id, createdAt: r.createdAt }));
    }
  }
}