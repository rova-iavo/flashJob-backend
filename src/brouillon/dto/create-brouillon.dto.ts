import { ApiProperty } from '@nestjs/swagger';

export class CreateBrouillonDto {
  @ApiProperty({ type: 'object', description: 'Service en brouillon (JSON)', additionalProperties: true })
  service: any;

  @ApiProperty({ 
    type: 'array', 
    items: { type: 'object', additionalProperties: true }, 
    description: 'Liste des offres (tableau de JSON)' 
  })
  liste_offre: any[];
}