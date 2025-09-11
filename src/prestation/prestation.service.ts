import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePrestationDto } from './dto/create-prestation.dto';
import { UpdatePrestationDto } from './dto/update-prestation.dto';

@Injectable()
export class PrestationService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePrestationDto) {
    return this.prisma.prestation.create({ data });
  }

  async findAll() {
    return this.prisma.prestation.findMany();
  }

  async findById(id_prestation: number) {
    return this.prisma.prestation.findUnique({ where: { id_prestation } });
  }

  async update(id_prestation: number, data: UpdatePrestationDto) {
    return this.prisma.prestation.update({ where: { id_prestation }, data });
  }

  async remove(id_prestation: number) {
    return this.prisma.prestation.delete({ where: { id_prestation } });
  }
}