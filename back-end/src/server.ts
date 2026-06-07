import fastifyJwt from "@fastify/jwt";
import Fastify from "fastify";
import { userRoutes } from "./routes/user.routes.js";
import { bookRoutes } from "./routes/book.routes.js";
import { shelfRoutes } from "./routes/shelf.routes.js";
import { reviewRoutes } from "./routes/review.routes.js";


const app = Fastify({

  logger: true,
});

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'chave-super-secreta-readex-2026'
});

app.register(userRoutes);
app.register(bookRoutes);
app.register(shelfRoutes);
app.register(reviewRoutes);


app.get("/healthcheck", async (request, reply) => {

  return { status: "ok", message: "Readex API está rodando perfeitamente!" };
});

const start = async () => {
  try {
    await app.listen({ port: 3333, host: "0.0.0.0" });
    console.log("Servidor HTTP rodando na porta 3333!");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();