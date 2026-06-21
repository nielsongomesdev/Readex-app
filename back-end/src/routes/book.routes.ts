import type { FastifyInstance } from 'fastify'
import { BookController } from '../controllers/book.controller.js'

export async function bookRoutes(app: FastifyInstance) {
  const bookController = new BookController()

  app.get('/books/search', bookController.search)
  app.post('/books', bookController.create)
  app.get('/books', bookController.list)
}