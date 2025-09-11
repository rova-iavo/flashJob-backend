import { ApiProperty } from '@nestjs/swagger';

export class CreateCategorieDto {
  @ApiProperty({ example: 'Informatique', description: 'Nom de la catégorie' })
  nom: string;
}