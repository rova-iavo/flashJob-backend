import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOffreDto } from './dto/create-offre.dto';
import { UpdateOffreDto } from './dto/update-offre.dto';

@Injectable()
export class OffreService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOffreDto) {
    return this.prisma.offre.create({ data });
  }

  async findAll() {
    return this.prisma.offre.findMany();
  }

  async findById(id_offre: number) {
    return this.prisma.offre.findUnique({ where: { id_offre } });
  }

  async update(id_offre: number, data: UpdateOffreDto) {
    return this.prisma.offre.update({ where: { id_offre }, data });
  }

  async remove(id_offre: number) {
    return this.prisma.offre.delete({ where: { id_offre } });
  }
}