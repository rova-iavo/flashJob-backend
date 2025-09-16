import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/service/prisma.service';
import { CreateBrouillonDto } from './dto/create-brouillon.dto';
import { UpdateBrouillonDto } from './dto/update-brouillon.dto';

@Injectable()
export class BrouillonService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBrouillonDto) {
    return this.prisma.brouillon.create({ data: dto });
  }

  async findAll() {
    return this.prisma.brouillon.findMany();
  }

  async findOne(id: number) {
    return this.prisma.brouillon.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdateBrouillonDto) {
    return this.prisma.brouillon.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    return this.prisma.brouillon.delete({ where: { id } });
  }
}