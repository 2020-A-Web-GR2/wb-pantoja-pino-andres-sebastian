import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpJuegoModule } from './http/http-juego.module';
import { CalculadoraModule } from './calculadora/calculadora.module';

@Module({
  imports: [
    // Se importan otros módulos
    HttpJuegoModule,
    CalculadoraModule,
  ],
  controllers: [
    // Controladores del app module
    AppController
  ],
  providers: [
    // Service del APP module
    AppService],
})
export class AppModule {}
