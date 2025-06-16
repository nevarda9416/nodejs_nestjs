import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as requestIp from 'request-ip';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // only get fields in DTO
      forbidNonWhitelisted: true, // block strange fields
      transform: true, // auto convert data type (ex: string => number)
    }),
  );
  // Request validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(requestIp.mw());
  app.use(helmet());
  app.use(compression());
  // Rate limiting against brute force attacks
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 500, // limit each IP to 500 requests per windowMs
      message: 'Too many requests from this IP, please try again later.',
      keyGenerator: (req) => requestIp.getClientIp(req),
    }),
  );
  const signupLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 10, // start blocking after 10 requests
    message:
      'Too many accounts created from this IP, please try again after an hour.',
    keyGenerator: (req) => requestIp.getClientIp(req),
  });
  app.use('/auth/signup', signupLimiter);
  // Swagger API documentation
  const options = new DocumentBuilder()
    .setTitle('NestStarter')
    .setVersion('0.0.1')
    .addTag('authentication')
    .addTag('connection')
    .addTag('users')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);
  await app.listen(process.env.PORT || 4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
