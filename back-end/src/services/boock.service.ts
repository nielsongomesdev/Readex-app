import { BookRepository } from '../repositories/book.repository.js'
import { Prisma } from '@prisma/client'

export class BookService {
  private bookRepository: BookRepository

  constructor() {
    this.bookRepository = new BookRepository()
  }

  async createBook(data: Prisma.BookCreateInput) {
    const book = await this.bookRepository.create(data)
    return book
  }

  async getAllBooks() {
    return await this.bookRepository.findAll()
  }

  async searchBooks(q?: string, limit = 20, offset = 0) {
    return await this.bookRepository.search(q, limit, offset)
  }
}