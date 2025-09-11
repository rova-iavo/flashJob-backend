import { CreatePrestationDto } from './create-prestation.dto';
import { CreateOffreDto } from '../../offre/dto/create-offre.dto';
import { CreateCategorieDto as CategorieDto } from '../../categorie/dto/create-categorie.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFullPrestationDto {
  @ApiProperty({ type: CategorieDto })
  categorie: CategorieDto;

  @ApiProperty({ type: CreatePrestationDto })
  prestation: CreatePrestationDto;

  @ApiProperty({ type: [CreateOffreDto] })
  offres: CreateOffreDto[];
}