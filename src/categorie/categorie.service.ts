import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';

@Injectable()
export class CategorieService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategorieDto) {
    return this.prisma.categorie.create({ data });
  }

  async findAll() {
    return this.prisma.categorie.findMany();
  }

  async findById(id: number) {
    const categorie = await this.prisma.categorie.findUnique({ where: { id } });
    if (!categorie) {
      throw new NotFoundException('Catégorie non trouvée');
    }
    return categorie;
  }

  async update(id: number, data: UpdateCategorieDto) {
    return this.prisma.categorie.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.categorie.delete({ where: { id } });
  }
}