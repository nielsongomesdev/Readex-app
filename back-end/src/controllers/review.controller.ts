import { type FastifyReply, type FastifyRequest } from "fastify";
import { createReview, getAllReviews, toggleLike } from "../services/review.service.js";

export async function addReviewController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = request.body as { bookId: string; rating: number; comment?: string };
    const user = request.user as { sub: string };

    if (!body.bookId || body.rating === undefined) {
      return reply.status(400).send({ error: "O ID do livro e a avaliação são obrigatórios." });
    }

    if (typeof body.rating !== "number" || body.rating < 1 || body.rating > 5) {
      return reply.status(400).send({ error: "A avaliação deve ser um número entre 1 e 5." });
    }

    const commentValue = body.comment ?? null;

    const review = await createReview({
      userId: user.sub,
      bookId: body.bookId,
      rating: body.rating,
      comment: commentValue,
    });

    return reply.status(201).send(review);
  } catch (error: any) {
    return reply.status(400).send({ error: error?.message ?? "Erro ao criar avaliação" });
  }
}

export async function listReviewsController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const reviews = await getAllReviews();
    return reply.status(200).send(reviews);
  } catch (error: any) {
    return reply.status(500).send({ error: error?.message ?? "Erro ao listar avaliações" });
  }
}

export async function toggleLikeController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const params = request.params as { id: string };
    const user = request.user as { sub: string };

    const result = await toggleLike(params.id, user.sub);
    return reply.status(200).send(result);
  } catch (error: any) {
    return reply.status(400).send({ error: error?.message ?? "Erro ao curtir/descurtir avaliação" });
  }
}