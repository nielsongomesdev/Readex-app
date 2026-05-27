import type { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller.js";

export async function userRoutes(app: FastifyInstance) {
  const userController = new UserController();

  app.post("/users", userController.create);
  app.get("/users", userController.list);
}
