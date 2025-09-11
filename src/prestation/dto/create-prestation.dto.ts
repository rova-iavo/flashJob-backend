import { ApiProperty } from '@nestjs/swagger';

export class CreatePrestationDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  categorieId: number;

  @ApiProperty()
  prestation_image: string;

  @ApiProperty()
  nom_prestation: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  note_moyenne: number;

  @ApiProperty()
  nombre_avis: number;

  @ApiProperty()
  delai_livraison_prestation_heures: number;

  @ApiProperty()
  paiement_securise: boolean;

  @ApiProperty()
  express: boolean;
}