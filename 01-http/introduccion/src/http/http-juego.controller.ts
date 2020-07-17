import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode, InternalServerErrorException,
  Param,
  Post,
  Query, Req, Res,
} from '@nestjs/common';
import { HttpJuegoService } from './http-juego.service';
import { validate, ValidationError } from 'class-validator';
import { MascotaCreateDto } from './dto/mascota.create-dto';



@Controller('juegos-http')
export class HttpJuegoController {
  constructor(private readonly _httpService: HttpJuegoService) {
  }

  @Get('hola')
  @HttpCode(201)
  holaGet(): string {
    throw new BadRequestException(
      'no envía nada',
    );
    //return 'Hola GET';
  }

  @Post('hola')
  @HttpCode(202)
  holaPost(): string {
    return 'Hola POST';
  }

  @Delete('hola')
  @HttpCode(204)
  @Header('Cache-control', 'none')
  @Header('EPN', 'prob000000000' +
    'ando')
  holaDelete(): string {
    return 'Hola DELETE';
  }

  @Get('parametros-ruta/:edad/gestion/:altura')
  parametrosRutaEjemplo(
    @Param() parametrosRuta,
  ): number {
    // verificar si es numero si es mandar suma, sino mandar bad request exception
    const esNaNEdad: boolean = isNaN(parametrosRuta.edad);
    const esNaNAltura: boolean = isNaN(parametrosRuta.altura);
    if (esNaNAltura || esNaNEdad) {
      throw new BadRequestException(
        'Los datos enviados no son números',
      );
    }
    const edad = Number(parametrosRuta.edad);
    const altura = Number(parametrosRuta.altura);
    return edad + altura;
  }


  @Get('parametros-consulta')
  parametrosConsulta(
    @Query() parametrosDeConsulta,
  ): string {
    // EJ. si se manda nombre y apellido entonces se los manda concatenados
    const nombre: string | null = parametrosDeConsulta['nombre'];
    const apellido: string | null = parametrosDeConsulta['apellido'];
    const existeNombre: boolean = nombre != null;
    const existeApellido: boolean = apellido != null;
    if (existeNombre && existeApellido) {
      return `${nombre} ${apellido}`;
    }
    //console.log('parametros de consulta', parametrosDeConsulta);
    return ':D ';
  }
  @Post('parametros-cuerpo')
  @HttpCode(200)
  async parametrosCuerpo(
    @Body() parametrosDeCuerpo,
  ) {
    const mascotaValida = new MascotaCreateDto();
    mascotaValida.casada = parametrosDeCuerpo.casada;
    mascotaValida.edad = parametrosDeCuerpo.edad;
    mascotaValida.nombre = parametrosDeCuerpo.nombre;
    mascotaValida.peso = parametrosDeCuerpo.peso;
    mascotaValida.ligada = parametrosDeCuerpo.ligada;

    try {
      const errores: ValidationError[] = await validate(mascotaValida);
      if (errores.length > 0) {
        console.error('Errores', errores);
        throw new BadRequestException('Ingreso de datos equivocado');
      }else {
        return ':D Se creó correctamente';
      }
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Error al validar');
    }
  }

  @Get('guardarCookieInsegura')
  guardarCookieInsegura(
    @Query() parametrosConsulta,
    @Req() req, //  request - PETICION
    @Res() res // response - RESPUESTA
  ) {
    res.cookie(
      'galletaInsegura', // nombre
      'Tengo hambre', // valor
    );
    const mensaje = {
      mensaje: 'ok'
    };
    // return mensaje; // NO SE PUEDE USAR RETURN CUANDO SE USA @Res() OJO !!!
    res.send(mensaje); // METODO EXPRESSJS
  }

  @Get('guardarCookieSegura')
  guardarCookieSegura(
    @Query() parametrosConsulta,
    @Req() req, //  request - PETICION
    @Res() res // response - RESPUESTA
  ) {
    res.cookie(
      'galletaaaaaSegura', // nombre
      'Tengo hambre',
      {
        secure: true
      }// valor
    );
    const mensaje = {
      mensaje: 'ok'
    };
    // return mensaje; // NO SE PUEDE USAR RETURN CUANDO SE USA @Res() OJO !!!
    res.send(mensaje); // METODO EXPRESSJS
  }

  @Get('mostrarCookies')
  mostrarCookies(
    @Req() req
  ) {
    const mensaje = {
      firadas: req.signedCookies,
      sinFirmar : req.cookies
    }
    return mensaje;
  }

  @Get('guardarCookieFirmada')
  public guardarCookieFirmada(
    @Res() res
  ) {
    res.cookie('firmada', 'poliburguer', {signed: true});

    const  mensaje = {
      mensaje: 'Cookie firmada'
    };
    res.send(mensaje);
  }
}


