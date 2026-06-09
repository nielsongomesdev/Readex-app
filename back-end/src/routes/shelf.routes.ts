import type { FastifyInstance } from "fastify";
import { addToShelfController, getUserShelfController } from "../controllers/shelf.controller.js";

export async function shelfRoutes(app: FastifyInstance) {
  app.post(
    "/shelf",
    {
      onRequest: async (request, reply) => {
        try {
          await request.jwtVerify();
        } catch {
          return reply.status(401).send({ error: "Não autorizado. Token inválido ou ausente." });
        }
      },
    },
    addToShelfController
  );

  app.get(
    "/shelf",
    {
      onRequest: async (request, reply) => {
        try {
          await request.jwtVerify();
        } catch {
          return reply.status(401).send({ error: "Não autorizado. Token inválido ou ausente." });
        }
      },
    },
    getUserShelfController
  );
}

