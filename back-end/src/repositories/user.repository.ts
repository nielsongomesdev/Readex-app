import { prisma } from '../lib/prisma.js'
import { Prisma } from '@prisma/client'

export class UserRepository {
  // Função para salvar um novo usuário no banco de dados
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }

  // Função para buscar um usuário pelo e-mail (essencial para o cadastro e login)
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  // Função para listar todos os usuários (ótimo para testarmos nossa API)
  async findAll() {
    const users = await prisma.user.findMany()
    return users
  }
}