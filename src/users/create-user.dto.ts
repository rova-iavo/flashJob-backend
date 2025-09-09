import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role.enum';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password_hash: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty({ default: false })
  is_subscribed?: boolean;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Avatar image file'
  })
  avatar?: any;

  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty({ enum: Role, required: false })
  role?: Role;
  
  @ApiProperty({ required: false })
  supabaseUserId?: string;
}

export class LoginDto {
  email: string;
  password_hash: string;
}