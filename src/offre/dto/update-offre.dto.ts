import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOffreDto {
  @ApiPropertyOptional()
  prestationId?: number;

  @ApiPropertyOptional()
  nom_offre?: string;

  @ApiPropertyOptional()
  prix?: number;

  @ApiPropertyOptional()
  delai_livraison_offre_heures?: number;

  @ApiPropertyOptional()
  is_popular?: boolean;

  @ApiPropertyOptional({ type: [String] })
  caracteristiques?: string[];
}