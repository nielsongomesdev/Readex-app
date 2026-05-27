import type { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../services/user.service.js";
import { Prisma } from "@prisma/client";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  create = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = request.body as Prisma.UserCreateInput;

      const user = await this.userService.createUser(data);

      return reply.status(201).send(user);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  };

  list = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const users = await this.userService.getAllUsers();
      return reply.status(200).send(users);
    } catch (error) {
      return reply.status(500).send({ error: "Erro interno do servidor" });
    }
  };
}
