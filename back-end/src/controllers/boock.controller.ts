import type { FastifyRequest, FastifyReply } from 'fastify'
import { BookService } from '../services/boock.service.js'
import { Prisma } from '@prisma/client'

export class BookController {
  private bookService: BookService

  constructor() {
    this.bookService = new BookService()
  }

  create = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = request.body as Prisma.BookCreateInput
      const book = await this.bookService.createBook(data)
      return reply.status(201).send(book)
    } catch (error: any) {
      return reply.status(400).send({ error: 'Erro ao cadastrar o livro' })
    }
  }

  list = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const books = await this.bookService.getAllBooks()
      return reply.status(200).send(books)
    } catch (error) {
      return reply.status(500).send({ error: 'Erro interno do servidor' })
    }
  }
}