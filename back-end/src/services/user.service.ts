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

  async login(email: string, passwordString: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("E-mail ou senha incorretos.");
    }

    const isValidPassword = await bcrypt.compare(passwordString, user.password);

    if (!isValidPassword) {
      throw new Error("E-mail ou senha incorretos.");
    }

    return user;
  }

  async getDashboard(userId: string) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const totalBooksReadInMonth = await this.userRepository.countReviewsInPeriod(
      userId,
      startOfMonth,
      startOfNextMonth
    );

    const reviews = await this.userRepository.findReviewsInPeriod(userId, startOfMonth, startOfNextMonth);

    // Monta série diária de leituras (counts por dia do mês)
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const monthlyRead = Array.from({ length: daysInMonth }, (_, i) => ({ day: i + 1, count: 0 }));
    for (const r of reviews) {
      const d = new Date(r.createdAt).getDate();
      monthlyRead[d - 1].count += 1;
    }

    // Recupera livros do usuário e calcula porcentagem de progresso (mockando total de páginas = 200)
    const userBooks = await this.userRepository.findUserBooksWithBook(userId);
    const assumedTotalPages = 200;
    const progressList = userBooks.map((ub) => {
      const percent = Math.min(100, Math.round((ub.pagesRead / assumedTotalPages) * 100));
      return {
        bookId: ub.book.id,
        title: ub.book.title,
        author: ub.book.author,
        pagesRead: ub.pagesRead,
        percent,
      };
    });

    const topBook = progressList.sort((a, b) => b.percent - a.percent)[0] || null;

    // Dias de sequência: campo opcional, aqui retornamos um mock
    const streakDays = 5;

    return {
      totalBooksReadInMonth,
      topBook,
      streakDays,
      charts: {
        monthlyRead,
        progress: progressList,
      },
    };
  }
}