import type { FastifyInstance } from "fastify";
import { FollowController } from "../controllers/follow.controller.js";

export async function followRoutes(app: FastifyInstance) {
  const followController = new FollowController();

  app.post(
    "/users/:id/follow",
    {
      onRequest: async (request, reply) => {
        try {
          await request.jwtVerify();
        } catch {
          return reply
            .status(401)
            .send({ error: "Não autorizado. Token inválido ou ausente." });
        }
      },
    },
    followController.follow
  );

  app.delete(
    "/users/:id/unfollow",
    {
      onRequest: async (request, reply) => {
        try {
          await request.jwtVerify();
        } catch {
          return reply
            .status(401)
            .send({ error: "Não autorizado. Token inválido ou ausente." });
        }
      },
    },
    followController.unfollow
  );

  app.get(
    "/followers",
    {
      onRequest: async (request, reply) => {
        try {
          await request.jwtVerify();
        } catch {
          return reply
            .status(401)
            .send({ error: "Não autorizado. Token inválido ou ausente." });
        }
      },
    },
    followController.getFollowers
  );

  app.get(
    "/following",
    {
      onRequest: async (request, reply) => {
        try {
          await request.jwtVerify();
        } catch {
          return reply
            .status(401)
            .send({ error: "Não autorizado. Token inválido ou ausente." });
        }
      },
    },
    followController.getFollowing
  );
}

