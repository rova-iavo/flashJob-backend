import { Module } from '@nestjs/common';
import { CategorieService } from './../../src/categorie/categorie.service';
import { CategorieController } from './../../src/categorie/categorie.controller';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

@Module({
  controllers: [CategorieController],
  providers: [CategorieService, PrismaService],
})
export class CategorieModule {}