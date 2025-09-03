import { Role } from './role.enum';

export class User {
  id: number;
  role: Role;
  email: string;
  password_hash: string;
  username: string;
  avatar?: string;
  bio?: string;
  rating_avg?: number;
  created_at: Date;
}