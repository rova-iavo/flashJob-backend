import { Injectable, UnauthorizedException, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'votre_secret'; // Utilise une variable d'environnement en prod

@Injectable()
export class AuthService {
  generateToken(payload: { id: number; email: string; role: string }) {
    return jwt.sign(
      { sub: payload.id, email: payload.email, role: payload.role },
      JWT_SECRET,
      { expiresIn: '1d' },
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

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('Token required');
    const token = authHeader.replace('Bearer ', '');
    this.authService.verifyToken(token); // Lance une exception si le token est invalide
    return true;
  }
}