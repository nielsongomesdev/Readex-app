import { prisma } from '../lib/prisma.js'
import { Prisma } from '@prisma/client'

export class BookRepository {
  async create(data: Prisma.BookCreateInput) {
    const book = await prisma.book.create({
      data,
    })
    return book
  }
  async findAll() {
    const books = await prisma.book.findMany()
    return books
  }
}