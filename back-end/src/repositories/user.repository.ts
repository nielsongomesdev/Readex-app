import { prisma } from '../lib/prisma.js'
import { Prisma } from '@prisma/client'

export class UserRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  async findAll() {
    const users = await prisma.user.findMany()
    return users
  }
}