// src/main.ts
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import Next from 'next';
import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const dev = process.env.NODE_ENV !== 'production';
  const nextApp = Next({ dev });
  const handle = nextApp.getRequestHandler();

  await nextApp.prepare();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Optional: Set global prefix for API routes
  app.setGlobalPrefix('api');

  // Middleware to handle Next.js routing
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.url.startsWith('/api')) {
      return next();
    }
    return handle(req, res);
  });

  await app.listen(3000);
  console.log(`> Ready on http://localhost:3000`);
}
bootstrap();
