import Fastify from "fastify";
import { userRoutes } from "./routes/user.routes.js"; // <-- Importando as nossas rotas

const app = Fastify({
  logger: true,
});

// Avisando o Fastify que nossas rotas de usuário existem
app.register(userRoutes);

// Rota de teste simples
app.get("/healthcheck", async (request, reply) => {
  return { status: "ok", message: "Readex API está rodando perfeitamente!" };
});

// Função para ligar o servidor
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
