import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePrestationDto } from './dto/create-prestation.dto';
import { UpdatePrestationDto } from './dto/update-prestation.dto';
import { CreateFullPrestationDto } from './dto/create-full-prestation.dto';
import { Offre } from '@prisma/client';

@Injectable()
export class PrestationService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePrestationDto) {
    return this.prisma.prestation.create({ data });
  }

  async findAll() {
    return this.prisma.prestation.findMany({
      include: {
        categorie: true,
        offres: true,
      },
    });
  }

  async findById(id_prestation: number) {
    return this.prisma.prestation.findUnique({
      where: { id_prestation },
      include: {
        categorie: true,
        offres: true,
      },
    });
  }

  async update(id_prestation: number, data: UpdatePrestationDto) {
    return this.prisma.prestation.update({ where: { id_prestation }, data });
  }

  async remove(id_prestation: number) {
    return this.prisma.prestation.delete({ where: { id_prestation } });
  }

  async createFullService(data: CreateFullPrestationDto) {
    return this.prisma.$transaction(
      async (tx) => {
        // 1. Insérer la catégorie si elle n'existe pas
        let categorie = await tx.categorie.findFirst({
          where: { nom: data.categorie.nom },
        });
        if (!categorie) {
          categorie = await tx.categorie.create({
            data: { nom: data.categorie.nom },
          });
        }

        // 2. Insérer la prestation (relation via categorieId)
        const prestation = await tx.prestation.create({
          data: {
            ...data.prestation,
            categorieId: categorie.id, // clé étrangère correcte
          },
        });

        // 3. Insérer les offres (relation via prestationId)
        const offres: Offre[] = [];
        for (const offreData of data.offres) {
          const offre = await tx.offre.create({
            data: {
              ...offreData,
              prestationId: prestation.id_prestation, // clé étrangère correcte
            },
          });
          offres.push(offre);
        }

        return { categorie, prestation, offres };
      },
      { timeout: 10000 } // 10 secondes
    );
  }
}