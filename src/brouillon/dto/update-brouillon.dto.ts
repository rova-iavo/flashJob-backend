import { PartialType } from '@nestjs/swagger';
import { CreateBrouillonDto } from './create-brouillon.dto';

export class UpdateBrouillonDto extends PartialType(CreateBrouillonDto) {}