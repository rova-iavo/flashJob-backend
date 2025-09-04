import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const JWT_SECRET = 'votre_secret'; // Utilise une variable d'environnement en prod

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('Token required');
    const token = authHeader.replace('Bearer ', '');
    try {
      jwt.verify(token, JWT_SECRET);
      // Vérification en base de donnée si le token n'est pas expiré 
      const prisma = new PrismaClient();
  const tokenRecord = await prisma.token.findFirst({ where: { token, is_expired: false } });
      if (!tokenRecord) {
        throw new UnauthorizedException('Token expired or invalidated');
      }
      next();
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}