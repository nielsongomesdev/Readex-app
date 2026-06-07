import { PrismaClient } from "@prisma/client";
<<<<<<< HEAD
=======
import type { FastifyInstance } from "fastify";
import { addToShelfController } from "../controllers/shelf.controller.js";
>>>>>>> 2a71ccc71f0ce3aea3fad8a9ca221dc70591d59f

const prisma = new PrismaClient();

export async function addBookToShelf(userId: string, bookId: string, status: string) {
<<<<<<< HEAD
  return prisma.userBook.upsert({
=======
  const shelfItem = await prisma.userBook.upsert({
>>>>>>> 2a71ccc71f0ce3aea3fad8a9ca221dc70591d59f
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
<<<<<<< HEAD
=======

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
>>>>>>> 2a71ccc71f0ce3aea3fad8a9ca221dc70591d59f
}

