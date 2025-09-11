import { ApiProperty } from '@nestjs/swagger';

export class CreateOffreDto {
  @ApiProperty()
  prestationId: number;

  @ApiProperty()
  nom_offre: string;

  @ApiProperty()
  prix: number;

  @ApiProperty()
  delai_livraison_offre_heures: number;

  @ApiProperty()
  is_popular: boolean;

  @ApiProperty({ type: [String] })
  caracteristiques: string[];
}