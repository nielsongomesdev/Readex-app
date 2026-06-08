import { type FastifyReply, type FastifyRequest } from "fastify";
import { createReview, getAllReviews, toggleLike } from "../services/review.service.js";

export async function addReviewController(request: FastifyRequest, reply: FastifyReply) {
  const body = request.body as { bookId: string; rating: number; comment?: string };
  const user = request.user as { sub: string };
  
  
  const commentValue = body.comment ?? null;

  const review = await createReview({
    userId: user.sub,
    bookId: body.bookId,
    rating: body.rating,
    comment: commentValue,
  });

  return reply.status(201).send(review);
}

export async function listReviewsController(request: FastifyRequest, reply: FastifyReply) {
  const reviews = await getAllReviews();
  return reply.status(200).send(reviews);
}

export async function toggleLikeController(request: FastifyRequest, reply: FastifyReply) {
  const params = request.params as { id: string };
  const user = request.user as { sub: string };

  const result = await toggleLike(params.id, user.sub);
  return reply.status(200).send(result);
}