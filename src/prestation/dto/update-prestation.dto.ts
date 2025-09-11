import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePrestationDto {
  @ApiPropertyOptional()
  userId?: number;

  @ApiPropertyOptional()
  categorieId?: number;

  @ApiPropertyOptional()
  prestation_image?: string;

  @ApiPropertyOptional()
  nom_prestation?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  note_moyenne?: number;

  @ApiPropertyOptional()
  nombre_avis?: number;

  @ApiPropertyOptional()
  delai_livraison_prestation_heures?: number;

  @ApiPropertyOptional()
  paiement_securise?: boolean;

  @ApiPropertyOptional()
  express?: boolean;
}