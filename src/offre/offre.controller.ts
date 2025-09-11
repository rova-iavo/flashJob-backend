import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OffreService } from './offre.service';
import { CreateOffreDto } from './dto/create-offre.dto';
import { UpdateOffreDto } from './dto/update-offre.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger'; 

@ApiTags('offres')
@Controller('offres')
export class OffreController {
  constructor(private readonly offreService: OffreService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer une nouvelle offre' })
  @ApiResponse({ status: 201, description: 'Offre créée.' })
  create(@Body() dto: CreateOffreDto) {
    return this.offreService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les offres' })
  @ApiResponse({ status: 200, description: 'Liste des offres.' })
  findAll() {
    return this.offreService.findAll();
  }

  @Get(':id_offre')
  @ApiOperation({ summary: 'Trouver une offre par ID' })
  @ApiResponse({ status: 200, description: 'Offre trouvée.' })
  findById(@Param('id_offre') id: string) {
    return this.offreService.findById(Number(id));
  }

  @Patch(':id_offre')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Modifier une offre' })
  @ApiResponse({ status: 200, description: 'Offre modifiée.' })
  update(@Param('id_offre') id: string, @Body() dto: UpdateOffreDto) {
    return this.offreService.update(Number(id), dto);
  }

  @Delete(':id_offre')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer une offre' })
  @ApiResponse({ status: 200, description: 'Offre supprimée.' })
  remove(@Param('id_offre') id: string) {
    return this.offreService.remove(Number(id));
  }
}