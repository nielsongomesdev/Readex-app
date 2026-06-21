import { UserRepository } from "../repositories/user.repository.js";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { resendClient } from "../lib/resend.js";

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

    // const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
      verificationCode: null,
      isVerified: true,
    });

    /*
    try {
      await resendClient.emails.send({
        from: 'onboarding@resend.dev',
        to: user.email,
        subject: 'Código de Verificação - Readex',
        html: `<p>Olá, <strong>${user.name}</strong>!</p><p>Seu código de verificação para o Readex é: <strong>${verificationCode}</strong></p>`
      });
    } catch (emailError) {
      console.error("Erro ao enviar e-mail via Resend:", emailError);
    }
    */

    return user;
  }

  async verifyUser(email: string, code: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    if (user.verificationCode !== code) {
      throw new Error("Código de verificação incorreto!");
    }

    await this.userRepository.updateVerification(user.id, true, null);
    return true;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async login(email: string, passwordString: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user || !user.password) {
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

    
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const monthlyRead = Array.from({ length: daysInMonth }, (_, i) => ({ day: i + 1, count: 0 }));
    
    for (const r of reviews) {
      const d = new Date(r.createdAt).getDate();
      
      const targetDay = monthlyRead[d - 1]; 
      
      if (targetDay) {
        targetDay.count += 1;
      }
    }
    
    
    const userBooks = await this.userRepository.findUserBooksWithBook(userId);
    const assumedTotalPages = 200;
    
    const progressList = userBooks.map((ub) => {
      const pagesRead = ub.pagesRead || 0; 
      const percent = Math.min(100, Math.round((pagesRead / assumedTotalPages) * 100));
      
      return {
        bookId: ub.book?.id || "id-desconhecido",
        title: ub.book?.title || "Título Indisponível",
        author: ub.book?.author || "Autor Desconhecido",
        pagesRead,
        percent,
      };
    });

    const topBook = progressList.sort((a, b) => b.percent - a.percent)[0] || null;

    
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