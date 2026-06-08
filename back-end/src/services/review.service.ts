import { prisma } from "../lib/prisma.js";
interface CreateReviewDTO {
  userId: string;
  bookId: string;
  rating: number;
  comment: string | null;
}

export async function createReview(data: CreateReviewDTO) {
  return await prisma.review.create({
    data: {
      userId: data.userId,
      bookId: data.bookId,
      rating: data.rating,
      comment: data.comment,
    },
  });
}

export async function getAllReviews() {
  return await prisma.review.findMany({
    include: {
      user: { select: { name: true } },
      book: { select: { title: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function toggleLike(reviewId: string, userId: string) {
  const existing = await prisma.like.findFirst({ where: { reviewId, userId } });

  if (existing) {
    await prisma.like.delete({ where: { id: existing.id } });
    return { liked: false };
  }

  await prisma.like.create({ data: { reviewId, userId } });
  return { liked: true };
}