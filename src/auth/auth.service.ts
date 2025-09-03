import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'votre_secret'; // Utilise une variable d'environnement en prod

@Injectable()
export class AuthService {
  generateToken(payload: { id: number; email: string; role: string }) {
    return jwt.sign(
      { sub: payload.id, email: payload.email, role: payload.role },
      JWT_SECRET,
      { expiresIn: '1h' },
    );
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}