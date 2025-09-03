import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from './login.dto'; // ou './create-user.dto' si LoginDto y est défini

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  constructor(private readonly authService: AuthService) {}

  async findAll() {
    return prisma.user.findMany();
  }

  async signin(createUserDto: CreateUserDto) {
    const user = await prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password_hash: createUserDto.password_hash,
        role: createUserDto.role,
        avatar: createUserDto.avatar,
        bio: createUserDto.bio,
      },
    });
    const token = this.authService.generateToken(user);

    // Insère ou met à jour le token dans la table Token
    await prisma.token.upsert({
      where: { userId: user.id },
      update: { token },
      create: { userId: user.id, token },
    });

    return { user, token };
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
      update: { token, expired: false },
      create: { userId: user.id, token, expired: false },
    });

    return { user, token };
  }

  async logout(token: string) {
    // Vérifie et décode le token pour obtenir l'id de l'utilisateur
    let payload: any;
    try {
      payload = this.authService.verifyToken(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    // Met à jour le token correspondant dans la base
    await prisma.token.updateMany({
      where: { userId: payload.sub, expired: false },
      data: { expired: true },
    });

    return { message: 'Logout successful' };
  }
}