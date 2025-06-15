import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // only get fields in DTO
      forbidNonWhitelisted: true, // block strange fields
      transform: true, // auto convert data type (ex: string => number)
    }),
  );
  await app.listen(4000);
}
bootstrap();
