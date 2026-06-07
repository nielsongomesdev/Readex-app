import { prisma } from "../lib/prisma.js";

// Definimos exatamente o que a função espera
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