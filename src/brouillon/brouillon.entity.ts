import { ApiProperty } from '@nestjs/swagger';

export class Brouillon {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: 'object', additionalProperties: true })
  service: any;

  @ApiProperty({ type: 'array', items: { type: 'object' } })
  liste_offre: any[];

  @ApiProperty()
  createdAt: Date;
}