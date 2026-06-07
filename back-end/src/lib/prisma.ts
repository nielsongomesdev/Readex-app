import { PrismaClient } from "@prisma/client";

type Any = any;

let prismaInstance: Any;

if (process.env.DATABASE_URL) {
	prismaInstance = new PrismaClient();
} else {
	
	const users: Any[] = [];
	const books: Any[] = [];
	const userBooks: Any[] = [];
	const reviews: Any[] = [];
	const follows: Any[] = [];

	prismaInstance = {
		user: {
			create: async ({ data }: Any) => {
				const id = `mock-${Date.now()}`;
				const item = { id, ...data, createdAt: new Date(), updatedAt: new Date() };
				users.push(item);
				return item;
			},
			findUnique: async ({ where }: Any) => {
				return users.find((u) => u.email === where.email) ?? null;
			},
			findMany: async () => users,
		},
		book: {
			create: async ({ data }: Any) => {
				const id = `mock-book-${Date.now()}`;
				const item = { id, ...data, createdAt: new Date(), updatedAt: new Date() };
				books.push(item);
				return item;
			},
			findMany: async () => books,
		},
		userBook: {
			findMany: async ({ where, include }: Any) => {
				const items = userBooks.filter((ub) => ub.userId === where.userId);
				if (include?.book) {
					return items.map((it) => ({ ...it, book: books.find((b) => b.id === it.bookId) }));
				}
				return items;
			},
			upsert: async ({ where, update, create }: Any) => {
				const existing = userBooks.find(
					(ub) =>
						ub.userId === where.userId_bookId.userId &&
						ub.bookId === where.userId_bookId.bookId
				);
				if (existing) {
					Object.assign(existing, update);
					existing.updatedAt = new Date();
					return existing;
				}
				const item = { id: `ub-${Date.now()}`, ...create, createdAt: new Date(), updatedAt: new Date() };
				userBooks.push(item);
				return item;
			},
		},
		follow: {
			findUnique: async ({ where }: Any) => {
				const key = where?.followerId_followingId;
				const found = follows.find(
					(f) => f.followerId === key?.followerId && f.followingId === key?.followingId
				);
				return found ?? null;
			},
			create: async ({ data }: Any) => {
				const item = { followerId: data.followerId, followingId: data.followingId, createdAt: new Date() };
				follows.push(item);
				return item;
			},
			delete: async ({ where }: Any) => {
				const key = where?.followerId_followingId;
				const idx = follows.findIndex((f) => f.followerId === key?.followerId && f.followingId === key?.followingId);
				if (idx >= 0) follows.splice(idx, 1);
				return;
			},
		},
		review: {
			count: async ({ where }: Any) => {
				return reviews.filter(
					(r) =>
						r.userId === where.userId &&
						new Date(r.createdAt) >= where.createdAt.gte &&
						new Date(r.createdAt) < where.createdAt.lt
				).length;
			},
			findMany: async ({ where }: Any) => {
				return reviews
					.filter(
						(r) =>
							r.userId === where.userId &&
							new Date(r.createdAt) >= where.createdAt.gte &&
							new Date(r.createdAt) < where.createdAt.lt
					)
					.map((r) => ({ id: r.id, createdAt: r.createdAt }));
			},
		},
	} as Any;
}

export const prisma = prismaInstance as unknown as PrismaClient;

