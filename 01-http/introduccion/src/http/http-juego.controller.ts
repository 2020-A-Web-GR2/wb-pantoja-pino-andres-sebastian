import { BadRequestException, Controller, Delete, Get, Header, HttpCode, Param, Post } from '@nestjs/common';
import { HttpJuegoService } from './http-juego.service';

@Controller('juegos-http')
export  class HttpJuegoController {
  constructor(private readonly _httpService: HttpJuegoService) {
  }
  @Get('hola')
  @HttpCode(201)
  holaGet(): string{
    throw new BadRequestException(
      'no envía nada'
    )
    //return 'Hola GET';
  }

  @Post('hola')
  @HttpCode(202)
  holaPost(): string{
    return 'Hola POST';
  }

  @Delete('hola')
  @HttpCode(204)
  @Header('Cache-control', 'none')
  @Header('EPN', 'probando')
  holaDelete(): string{
    return 'Hola DELETE';
  }

  @Get('parametros-ruta/:edad/gestion/:altura')
  parametrosRutaEjemplo(
    @Param() parametrosRuta
  ): number{
    // verificar si es numero si es mandar suma, sino mandar bad request exception
    const esNaNEdad: boolean = isNaN(parametrosRuta.edad);
    const esNaNAltura: boolean = isNaN(parametrosRuta.altura);
    if(esNaNAltura || esNaNEdad){
      throw new BadRequestException(
        'Los datos enviados no son números'
      )
    }
    const edad: number = Number(parametrosRuta.edad);
    const altura: number = Number(parametrosRuta.altura);
    return edad + altura;
  }















}