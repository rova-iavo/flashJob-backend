import { Module } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CategorieController } from './categorie.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [CategorieController],
  providers: [CategorieService, PrismaService],
})
export class CategorieModule {}