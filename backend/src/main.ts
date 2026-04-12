import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

let cachedApp: INestApplication;

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('DHAC API')
    .setDescription('The DHAC Financial System API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  await app.init();
  return { app, server };
}

// Handler para Vercel
export default async (req: any, res: any) => {
  if (!cachedApp) {
    const { app } = await bootstrap();
    cachedApp = app;
  }
  const server = cachedApp.getHttpAdapter().getInstance();
  return server(req, res);
};

// Soporte para ejecución local heredado
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then(({ app }) => {
    const port = process.env.PORT ?? 4000;
    app.listen(port).then(() => {
      console.log(`Server running on http://localhost:${port}`);
    });
  });
}

