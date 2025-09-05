import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Récupère les origines CORS depuis .env
  const corsOrigins = process.env.CORS_ORIGINS?.split(',').map(origin => origin.trim());
  app.enableCors({
    origin: corsOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('FlashJob API')
    .setDescription('API documentation for FlashJob')
    .setVersion('1.0')
    .addBearerAuth() // <--- AJOUTE CETTE LIGNE
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
