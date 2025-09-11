import { ApiProperty } from '@nestjs/swagger';

export class CreateAvisDto {
  @ApiProperty({ example: 1, description: 'ID de l\'utilisateur' })
  userId: number;

  @ApiProperty({ example: 1, description: 'ID de la prestation ou de l\'offre' })
  prestationId: number;

  @ApiProperty({ example: 5, description: 'Note attribuée' })
  note: number;

  @ApiProperty({ example: 'Très bon service', description: 'Commentaire de l\'avis' })
  commentaire: string;
}