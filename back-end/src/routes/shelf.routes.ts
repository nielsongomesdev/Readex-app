import type { FastifyInstance } from "fastify";
<<<<<<< HEAD

import { addToShelfController } from "../controllers/shelf.controller.js";

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
}

=======
import { shelfRoutes } from "../services/shelf.service.js";

// Re-exporta/forma a camada de rotas para manter o padrão
// usado em `server.ts` (import de ./routes/shelf.routes.js).
export async function shelfRoutesRoute(app: FastifyInstance) {
  await shelfRoutes(app);
}

// Mantemos o nome exportado esperado pelo server.
export { shelfRoutesRoute as shelfRoutes };

>>>>>>> 2a71ccc71f0ce3aea3fad8a9ca221dc70591d59f
