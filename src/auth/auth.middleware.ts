import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'votre_secret'; // Utilise une variable d'environnement en prod

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('Token required');
    const token = authHeader.replace('Bearer ', '');
    try {
      jwt.verify(token, JWT_SECRET);
      next();
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}