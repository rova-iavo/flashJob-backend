import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrestationService } from './prestation.service';
import { CreatePrestationDto } from './dto/create-prestation.dto';
import { UpdatePrestationDto } from './dto/update-prestation.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreateFullPrestationDto } from './dto/create-full-prestation.dto';

@ApiTags('prestations')
@Controller('prestations')
export class PrestationController {
  constructor(private readonly prestationService: PrestationService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer une nouvelle prestation complète (catégorie, prestation, offres)' })
  @ApiBody({ type: CreateFullPrestationDto })
  @ApiResponse({ status: 201, description: 'Prestation complète créée.' })
  create(@Body() dto: CreateFullPrestationDto) {
    return this.prestationService.createFullService(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les prestations' })
  @ApiResponse({ status: 200, description: 'Liste des prestations.' })
  findAll() {
    return this.prestationService.findAll();
  }

  @Get(':id_prestation')
  @ApiOperation({ summary: 'Trouver une prestation par ID' })
  @ApiResponse({ status: 200, description: 'Prestation trouvée.' })
  findById(@Param('id_prestation') id: string) {
    return this.prestationService.findById(Number(id));
  }

  @Patch(':id_prestation')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Modifier une prestation' })
  @ApiResponse({ status: 200, description: 'Prestation modifiée.' })
  update(@Param('id_prestation') id: string, @Body() dto: UpdatePrestationDto) {
    return this.prestationService.update(Number(id), dto);
  }

  @Delete(':id_prestation')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer une prestation' })
  @ApiResponse({ status: 200, description: 'Prestation supprimée.' })
  remove(@Param('id_prestation') id: string) {
   return this.prestationService.remove(Number(id));
  }
}