import fastifyJwt from "@fastify/jwt";
import Fastify from "fastify";
import { userRoutes } from "./routes/user.routes.js";
import { bookRoutes } from "./routes/book.routes.js";
<<<<<<< HEAD
import { shelfRoutes } from "./routes/shelf.routes.js";
=======
import { shelfRoutes } from "./routes/shelf.routes.js"; // 👈 LIGANDO AQUI!
>>>>>>> 2a71ccc71f0ce3aea3fad8a9ca221dc70591d59f

const app = Fastify({

  logger: true,
});

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'chave-super-secreta-readex-2026'
});

app.register(userRoutes);
app.register(bookRoutes);
<<<<<<< HEAD
app.register(shelfRoutes);
=======
app.register(shelfRoutes); // 👈 REGISTRANDO AQUI!
>>>>>>> 2a71ccc71f0ce3aea3fad8a9ca221dc70591d59f

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