import { Module } from '@nestjs/common';
import { PrestationService } from './prestation.service';
import { PrestationController } from './prestation.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [PrestationController],
  providers: [PrestationService, PrismaService],
})
export class PrestationModule {}