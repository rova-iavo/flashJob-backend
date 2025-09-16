import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BrouillonService } from './brouillon.service';
import { CreateBrouillonDto } from './dto/create-brouillon.dto';
import { UpdateBrouillonDto } from './dto/update-brouillon.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Brouillon } from './brouillon.entity';

@ApiTags('brouillons')
@Controller('brouillons')
export class BrouillonController {
  constructor(private readonly brouillonService: BrouillonService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer un brouillon' })
  @ApiResponse({ status: 201, type: Brouillon })
  create(@Body() dto: CreateBrouillonDto) {
    return this.brouillonService.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lister tous les brouillons' })
  @ApiResponse({ status: 200, type: [Brouillon] })
  findAll() {
    return this.brouillonService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Trouver un brouillon par ID' })
  @ApiResponse({ status: 200, type: Brouillon })
  findOne(@Param('id') id: string) {
    return this.brouillonService.findOne(Number(id));
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Modifier un brouillon' })
  @ApiResponse({ status: 200, type: Brouillon })
  update(@Param('id') id: string, @Body() dto: UpdateBrouillonDto) {
    return this.brouillonService.update(Number(id), dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un brouillon' })
  @ApiResponse({ status: 200, description: 'Brouillon supprimé.' })
  remove(@Param('id') id: string) {
    return this.brouillonService.remove(Number(id));
  }
}