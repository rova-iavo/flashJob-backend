import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from './login.dto'; 
import { createClient } from '@supabase/supabase-js';

const prisma = new PrismaClient();

const supabaseUrl = 'https://qyvaafsilhhvyjvqfmgh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5dmFhZnNpbGhodnlqdnFmbWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4OTg1MDEsImV4cCI6MjA3MjQ3NDUwMX0.TEHM_JmWxIRkKM-ASLMknLzS-9LhALpMJwLF5oCjRMA';
const supabase = createClient(supabaseUrl, supabaseKey);

@Injectable()
export class UsersService {
  constructor(private readonly authService: AuthService) {}

  async findAll() {
    return prisma.user.findMany();
  }

  async signin(createUserDto: CreateUserDto) {
    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Cet email existe déjà');
    }

    // Inscription sur Supabase et envoi de l'email de vérification
    const ret = await this.sendEmailToUser(createUserDto.email);
    console.log(ret);

    if (!ret.user?.id) {
      throw new ConflictException('Impossible de récupérer l\'ID utilisateur Supabase.');
    }

    // Création de l'utilisateur local avec l'ID Supabase
    const user = await prisma.user.create({
      data: {
        firstname: createUserDto.firstname,
        lastname: createUserDto.lastname,
        is_subscribed: createUserDto.is_subscribed ?? false,
        email: createUserDto.email,
        password_hash: createUserDto.password_hash,
        role: createUserDto.role ?? 'CLIENT', 
        avatar: createUserDto.avatar,
        bio: createUserDto.bio,
        supabaseUserId: ret.user.id, 
      },
    });

    const token = this.authService.generateToken(user);

    // Insère ou met à jour le token dans la table Token
    await prisma.token.upsert({
      where: { userId: user.id },
      update: { token },
      create: { userId: user.id, token },
    });

    return { user: user, token: token, message: 'Veuillez vérifier votre email.' };
  }

  async login(loginUserDto: LoginDto) {
    const user = await prisma.user.findUnique({
      where: { email: loginUserDto.email },
    });
    if (!user || user.password_hash !== loginUserDto.password_hash) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.authService.generateToken(user);

    // Met à jour ou crée le token pour cet utilisateur
    await prisma.token.upsert({
      where: { userId: user.id },
      update: { token, is_expired: false },
      create: { userId: user.id, token, is_expired: false },
    });

    return { user, token };
  }

  async logout(token: string) {
    
    // Vérifie et décode le token pour obtenir l'id de l'utilisateur
    let user: any;
    try {
      user = this.authService.verifyToken(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    // Met à jour le token correspondant dans la base
    await prisma.token.updateMany({
      where: { userId: user.sub, is_expired: false },
      data: { is_expired: true },
    });

    return { message: 'Logout successful' };
  }

  async sendEmailToUser(email: string) {
    // Génère un mot de passe temporaire pour Supabase (juste pour la vérification email)
  
    const tempPassword = Math.random().toString(36).slice(-10);
    console.log("Temporary password generated for user registration:", tempPassword);
    console.log("Registering user with email:", email);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password: tempPassword,
    });
    console.log(error);
    

    if (error) {
      throw new Error(error.message);
    }
    // L’email de vérification est envoyé automatiquement par Supabase
    return {
      message: 'Inscription réussie. Veuillez vérifier votre email pour activer votre compte.',
      user: data.user,
    };
  }

  async isEmailConfirmed(userId: string) {
    console.log('MAKATO VE?');
    const { data, error } = await supabase.auth.admin.getUserById(userId);

    if (error) {
      throw new Error(error.message);
    }

    return data.user.email_confirmed_at !== null;
  }
}