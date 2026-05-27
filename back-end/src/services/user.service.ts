import { UserRepository } from "../repositories/user.repository.js";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePassword(password: string): boolean {
    return password.length >= 6;
  }

  async createUser(data: Prisma.UserCreateInput) {
    if (!this.validateEmail(data.email)) {
      throw new Error("E-mail inválido!");
    }

    if (!this.validatePassword(data.password)) {
      throw new Error("A senha deve ter pelo menos 6 caracteres!");
    }

    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new Error("Este e-mail já está em uso no sistema!");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }
}
