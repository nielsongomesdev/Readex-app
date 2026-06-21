import type { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller.js";

export async function userRoutes(app: FastifyInstance) {
  const userController = new UserController();

  app.post("/users", userController.create);
  app.post("/users/verify", userController.verify);
  app.get("/users", userController.list);
  app.post("/login", userController.login);
  app.get(
    "/users/dashboard",
    {
      onRequest: async (request, reply) => {
        try {
          await request.jwtVerify();
        } catch {
          return reply.status(401).send({ error: "Não autorizado. Token inválido ou ausente." });
        }
      },
    },
    userController.getDashboard
  );
}