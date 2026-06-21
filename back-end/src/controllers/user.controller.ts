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
      const { password, ...userWithoutPassword } = user as any;
      return reply.status(201).send(userWithoutPassword);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  };

  verify = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { email, code } = request.body as { email: string; code: string };
      
      if (!email || !code) {
        return reply.status(400).send({ error: "Email e código são obrigatórios!" });
      }

      await this.userService.verifyUser(email, code);
      return reply.status(200).send({ message: "E-mail verificado com sucesso!" });
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  };

  list = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const users = await this.userService.getAllUsers();
      const usersWithoutPassword = users.map((user: any) => {
        const { password, ...u } = user;
        return u;
      });
      return reply.status(200).send(usersWithoutPassword);
    } catch (error) {
      return reply.status(500).send({ error: "Erro interno do servidor" });
    }
  };

  login = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { email, password } = request.body as any;
      const user = await this.userService.login(email, password);
      const token = await reply.jwtSign(
        {
          name: user.name,
          email: user.email,
        },
        {
          sign: { sub: user.id, expiresIn: "7d" },
        }
      );

      return reply.status(200).send({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      });
    } catch (error: any) {
      return reply.status(401).send({ error: error.message });
    }
  };

  getDashboard = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { sub: userId } = request.user as { sub: string };
      const data = await this.userService.getDashboard(userId);
      return reply.status(200).send(data);
    } catch (error: any) {
      return reply.status(500).send({ error: error?.message ?? "Erro ao gerar dashboard" });
    }
  };

  getProfile = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { sub: userId } = request.user as { sub: string };
      const user = await this.userService.getUserProfile(userId);
      const { password, ...userWithoutPassword } = user as any;
      return reply.status(200).send(userWithoutPassword);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  };
}