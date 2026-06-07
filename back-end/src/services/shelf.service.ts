import { PrismaClient } from "@prisma/client";
import type { FastifyInstance } from "fastify";
import { addToShelfController } from "../controllers/shelf.controller.js";

const prisma = new PrismaClient();

export async function addBookToShelf(userId: string, bookId: string, status: string) {
  const shelfItem = await prisma.userBook.upsert({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    },
    update: {
      status,
    },
    create: {
      userId,
      bookId,
      status,
      pagesRead: 0,
    },
  });

  return shelfItem;
}

export async function shelfRoutes(app: FastifyInstance) {
  app.post(
    "/shelf",
    {
      // Validamos o Token diretamente aqui na entrada da rota!
      onRequest: async (request, reply) => {
        try {
          await request.jwtVerify();
        } catch (err) {
          return reply.status(401).send({ error: "Não autorizado. Token inválido ou ausente." });
        }
      },
    },
    addToShelfController
  );
}

