import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
  * Configuraciones
  * antes del app.listen()
  * */
  app.use(cookieParser('la clave es un valor importante del uno al cinco'));
  await app.listen(3001);
}
bootstrap();
