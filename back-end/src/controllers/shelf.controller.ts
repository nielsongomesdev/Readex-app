import type { FastifyRequest, FastifyReply } from "fastify";
import { addBookToShelf } from "../services/shelf.service.js";

export async function addToShelfController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { sub: userId } = request.user as { sub: string };
    const { bookId, status } = request.body as { bookId: string; status: string };

    if (!bookId || !status) {
      return reply.status(400).send({ error: "O ID do livro e o status são obrigatórios." });
    }

    const shelfItem = await addBookToShelf(userId, bookId, status);
    return reply.status(201).send(shelfItem);
  } catch (error: any) {
    return reply.status(409).send({ error: error?.message ?? "Erro ao adicionar na estante" });
  }
}

