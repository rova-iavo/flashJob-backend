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

  async findById(id: number) {
    return this.prisma.offre.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateOffreDto) {
    return this.prisma.offre.update({ where: {id }, data });
  }

  async remove(id: number) {
    return this.prisma.offre.delete({ where: {id } });
  }
}