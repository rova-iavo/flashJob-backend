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

  @ApiProperty({ required: false })
  avatar?: string;

  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty({ enum: Role, required: false })
  role?: Role;
}

export class LoginDto {
  email: string;
  password_hash: string;
}