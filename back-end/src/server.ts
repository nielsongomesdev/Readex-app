import Fastify from 'fastify'

const app = Fastify({
  logger: true
})

app.get('/healthcheck', async (request, reply) => {
  return { status: 'ok', message: 'Readex API está rodando perfeitamente!' }
})

const start = async () => {
  try {
    await app.listen({ port: 3333, host: '0.0.0.0' })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()