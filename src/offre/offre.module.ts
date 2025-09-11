import { Module } from '@nestjs/common';
import { OffreService } from './offre.service';
import { OffreController } from './offre.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [OffreController],
  providers: [OffreService, PrismaService],
})
export class OffreModule {}