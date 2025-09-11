import { Module } from '@nestjs/common';
import { PrestationService } from './prestation.service';
import { PrestationController } from './prestation.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [PrestationController],
  providers: [PrestationService, PrismaService],
})
export class PrestationModule {}