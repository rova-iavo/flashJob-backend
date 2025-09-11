import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'use */api to redirect to swagger documentation';
  }
}
