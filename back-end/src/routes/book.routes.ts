import type { FastifyInstance } from 'fastify'
import { BookController } from '../controllers/boock.controller.js'

export async function bookRoutes(app: FastifyInstance) {
  const bookController = new BookController()

  app.post('/books', bookController.create)
  app.get('/books', bookController.list)
  app.get('/books/search', bookController.search)
}