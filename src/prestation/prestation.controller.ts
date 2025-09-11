import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrestationService } from './prestation.service';
import { CreatePrestationDto } from './dto/create-prestation.dto';
import { UpdatePrestationDto } from './dto/update-prestation.dto';

@ApiTags('prestations')
@Controller('prestations')
export class PrestationController {
  constructor(private readonly prestationService: PrestationService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle prestation' })
  @ApiResponse({ status: 201, description: 'Prestation créée.' })
  create(@Body() dto: CreatePrestationDto) {
    return this.prestationService.create(dto);
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
  @ApiOperation({ summary: 'Modifier une prestation' })
  @ApiResponse({ status: 200, description: 'Prestation modifiée.' })
  update(@Param('id_prestation') id: string, @Body() dto: UpdatePrestationDto) {
    return this.prestationService.update(Number(id), dto);
  }

  @Delete(':id_prestation')
  @ApiOperation({ summary: 'Supprimer une prestation' })
  @ApiResponse({ status: 200, description: 'Prestation supprimée.' })
  remove(@Param('id_prestation') id: string) {
    return this.prestationService.remove(Number(id));
  }
}