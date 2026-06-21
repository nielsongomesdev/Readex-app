import { UserRepository } from "../repositories/user.repository.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export class SocialService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async handleSupabaseAccessToken(accessToken: string) {
    if (!process.env.SUPABASE_URL) throw new Error("SUPABASE_URL não configurado");

    const res = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY || "",
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Falha ao verificar token no Supabase: ${res.status} ${text}`);
    }

    const data = await res.json();
    const email = data.email as string | undefined;
    const name = (data.user_metadata && (data.user_metadata.full_name || data.user_metadata.name)) || data.email || "Usuário";

    if (!email) throw new Error("E-mail não disponível no provedor de autenticação");

    let user = await this.userRepository.findByEmail(email);

    if (!user) {
      
      const randomPassword = crypto.randomBytes(16).toString("hex");
      const hashed = await bcrypt.hash(randomPassword, 10);
      user = await this.userRepository.create({
        name,
        email,
        password: hashed,
      } as any);
    }

    return user;
  }
}
