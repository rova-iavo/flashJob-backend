import { Module } from '@nestjs/common';
import { BrouillonService } from './brouillon.service';
import { BrouillonController } from './brouillon.controller';
import { PrismaService } from '../../prisma/service/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [BrouillonController],
  providers: [BrouillonService, PrismaService],
})
export class BrouillonModule {}