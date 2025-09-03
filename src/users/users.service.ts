import { Injectable } from '@nestjs/common';
import { PrismaClient, Role } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async findAll() {
    return prisma.user.findMany();
  }

  async create(createUserDto: CreateUserDto) {
    return prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password_hash: createUserDto.password_hash,
        role: createUserDto.role, // optionnel
        avatar: createUserDto.avatar,
        bio: createUserDto.bio,
      },
    });
  }
}