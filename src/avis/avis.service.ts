import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAvisDto } from './dto/create-avis.dto';
import { UpdateAvisDto } from './dto/update-avis.dto';

@Injectable()
export class AvisService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAvisDto) {
    return this.prisma.avis.create({ data });
  }

  async findAll() {
    return this.prisma.avis.findMany();
  }

  async findById(id_avis: number) {
    return this.prisma.avis.findUnique({ where: { id_avis } });
  }

  async update(id_avis: number, data: UpdateAvisDto) {
    return this.prisma.avis.update({ where: { id_avis }, data });
  }

  async remove(id_avis: number) {
    return this.prisma.avis.delete({ where: { id_avis } });
  }
}