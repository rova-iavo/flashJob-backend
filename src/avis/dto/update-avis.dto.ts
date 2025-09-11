import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAvisDto {
  @ApiPropertyOptional({ example: 1, description: "ID de l'utilisateur" })
  userId?: number;

  @ApiPropertyOptional({ example: 1, description: "ID de la prestation ou de l'offre" })
  prestationId?: number;

  @ApiPropertyOptional({ example: 5, description: 'Note attribuée' })
  note?: number;

  @ApiPropertyOptional({ example: 'Très bon service', description: "Commentaire de l'avis" })
  commentaire?: string;
}