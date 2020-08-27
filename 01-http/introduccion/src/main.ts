import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieParser = require('cookie-parser');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
  /*
  * Configuraciones
  * antes del app.listen()
  * */
  app.use(cookieParser('la clave es un valor importante del uno al cinco'));
  app.set('view engine', 'ejs');
  app.use(express.static('publico'));
  await app.listen(3001);
}
bootstrap();
