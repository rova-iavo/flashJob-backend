import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategorieService } from './categorie.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';

@ApiTags('categories')
@Controller('categories')
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle catégorie' })
  @ApiResponse({ status: 201, description: 'Catégorie créée.' })
  create(@Body() dto: CreateCategorieDto) {
    return this.categorieService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les catégories' })
  @ApiResponse({ status: 200, description: 'Liste des catégories.' })
  findAll() {
    return this.categorieService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Trouver une catégorie par ID' })
  @ApiResponse({ status: 200, description: 'Catégorie trouvée.' })
  findById(@Param('id') id: string) {
    return this.categorieService.findById(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier une catégorie' })
  @ApiResponse({ status: 200, description: 'Catégorie modifiée.' })
  update(@Param('id') id: string, @Body() dto: UpdateCategorieDto) {
    return this.categorieService.update(Number(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une catégorie' })
  @ApiResponse({ status: 200, description: 'Catégorie supprimée.' })
  remove(@Param('id') id: string) {
    return this.categorieService.remove(Number(id));
  }
}