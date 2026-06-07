import type { FastifyInstance } from "fastify";
import { shelfRoutes } from "../services/shelf.service.js";

// Re-exporta/forma a camada de rotas para manter o padrão
// usado em `server.ts` (import de ./routes/shelf.routes.js).
export async function shelfRoutesRoute(app: FastifyInstance) {
  await shelfRoutes(app);
}

// Mantemos o nome exportado esperado pelo server.
export { shelfRoutesRoute as shelfRoutes };

