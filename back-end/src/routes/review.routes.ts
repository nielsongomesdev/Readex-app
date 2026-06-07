import type { FastifyInstance } from "fastify";
import { addReviewController, listReviewsController, toggleLikeController } from "../controllers/review.controller.js";

export async function reviewRoutes(app: FastifyInstance) {
  app.get("/reviews", listReviewsController);

  app.post(
    "/reviews",
    {
      onRequest: async (request, reply) => {
        try {
          await request.jwtVerify();
        } catch (err) {
          return reply.status(401).send({ error: "Não autorizado" });
        }
      },
    },
    addReviewController
  );

  app.post(
    "/reviews/:id/like",
    {
      onRequest: async (request, reply) => {
        try {
          await request.jwtVerify();
        } catch (err) {
          return reply.status(401).send({ error: "Não autorizado" });
        }
      },
    },
    toggleLikeController
  );
}