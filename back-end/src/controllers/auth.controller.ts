import type { FastifyRequest, FastifyReply } from "fastify";
import { SocialService } from "../services/social.service.js";

export class AuthController {
  private socialService: SocialService;

  constructor() {
    this.socialService = new SocialService();
  }

  social = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { access_token } = request.body as { access_token?: string };
      if (!access_token) return reply.status(400).send({ error: "access_token é obrigatório" });

      const user = await this.socialService.handleSupabaseAccessToken(access_token);

      const token = await reply.jwtSign(
        { name: user.name, email: user.email },
        { sign: { sub: user.id, expiresIn: "7d" } }
      );

      return reply.status(200).send({ user: { id: user.id, name: user.name, email: user.email }, token });
    } catch (error: any) {
      return reply.status(401).send({ error: error.message || 'Erro na autenticação social' });
    }
  };
}
