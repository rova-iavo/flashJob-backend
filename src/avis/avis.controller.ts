import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AvisService } from './avis.service';
import { CreateAvisDto } from './dto/create-avis.dto';
import { UpdateAvisDto } from './dto/update-avis.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('avis')
@Controller('avis')
export class AvisController {
  constructor(private readonly avisService: AvisService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer un nouvel avis' })
  @ApiResponse({ status: 201, description: 'Avis créé.' })
  create(@Body() dto: CreateAvisDto) {
    return this.avisService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister tous les avis' })
  @ApiResponse({ status: 200, description: 'Liste des avis.' })
  findAll() {
    return this.avisService.findAll();
  }

  @Get(':id_avis')
  @ApiOperation({ summary: 'Trouver un avis par ID' })
  @ApiResponse({ status: 200, description: 'Avis trouvé.' })
  findById(@Param('id_avis') id: string) {
    return this.avisService.findById(Number(id));
  }

  @Patch(':id_avis')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Modifier un avis' })
  @ApiResponse({ status: 200, description: 'Avis modifié.' })
  update(@Param('id_avis') id: string, @Body() dto: UpdateAvisDto) {
    return this.avisService.update(Number(id), dto);
  }

  @Delete(':id_avis')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un avis' })
  @ApiResponse({ status: 200, description: 'Avis supprimé.' })
  remove(@Param('id_avis') id: string) {
    return this.avisService.remove(Number(id));
  }
}