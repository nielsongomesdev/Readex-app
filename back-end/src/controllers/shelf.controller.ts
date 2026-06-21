import type { FastifyRequest, FastifyReply } from "fastify";
import { addBookToShelf, getUserShelf } from "../services/shelf.service.js";

export async function addToShelfController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { sub: userId } = request.user as { sub: string };
    const { bookId, status, pagesRead } = request.body as { bookId: string; status: string; pagesRead?: number };

    if (!bookId || !status) {
      return reply.status(400).send({ error: "O ID do livro e o status são obrigatórios." });
    }

    if (pagesRead !== undefined && (typeof pagesRead !== "number" || pagesRead < 0)) {
      return reply.status(400).send({ error: "O progresso de páginas lidas deve ser um número maior ou igual a zero." });
    }

    const shelfItem = await addBookToShelf(userId, bookId, status, pagesRead ?? 0);
    return reply.status(201).send(shelfItem);
  } catch (error: any) {
    return reply.status(409).send({ error: error?.message ?? "Erro ao adicionar na estante" });
  }
}

export async function getUserShelfController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { sub: userId } = request.user as { sub: string };
    const shelf = await getUserShelf(userId);
    return reply.status(200).send(shelf);
  } catch (error: any) {
    return reply.status(500).send({ error: error?.message ?? "Erro ao listar a estante" });
  }
}

