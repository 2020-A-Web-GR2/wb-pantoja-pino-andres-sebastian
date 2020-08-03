import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param, Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { HttpJuegoService } from '../http/http-juego.service';
import { CalculadoraService } from './calculadora.service';
import { validate, ValidationError } from 'class-validator';
import { CalculadoraSumarRestarMultiplicarDto } from './dto/calculadora.sumar-restar-multiplicar-dto';
import { CalculadoraDividirDto } from './dto/calculadora.dividir-dto';

@Controller('calculadora')
export class CalculadoraController{

  constructor(private readonly _calculadoraService: CalculadoraService) {
  }

  mensajeErrorIngresarDatos = 'Error de ingreso de datos';

  @Get('')
  funciona(
    @Req() req
  ): string{
    console.log(typeof  req.signedCookies.puntaje, typeof  req.cookies.token, req.signedCookies.puntaje );
    return req.signedCookies;
  }
  @Get('puntaje')
  enviarPuntaje(
    @Req() req
  ){
    return `${req.cookies.token}, tu puntaje es ${req.signedCookies.puntaje}`
  }

  @Get('sumar')
  @HttpCode(200)
  async sumar( // n1 query n2 query
    @Req() req,
    @Res() res,
    @Query() parametrosDeRuta
  ){
    if(!this.hayToken(req)){
      throw new BadRequestException("Registrese para utilizar la calculadora")
    }

    const numero1 = parametrosDeRuta.numero1;
    const numero2 = parametrosDeRuta.numero2;
    const numeros = new CalculadoraSumarRestarMultiplicarDto();
    numeros.numero1 = Number(numero1);
    numeros.numero2 = Number(numero2);

    try {
      const errores: ValidationError[] = await validate(numeros);
      if (errores.length > 0) {
        console.error('Errores', errores);
        throw new BadRequestException('Ingreso de datos equivocado');
      }else {
        const resultado : number = this._calculadoraService
          .sumar(
              Number(numero1),
              Number(numero2)
          );
        const mensaje = {
          resultado: `${numero1} + ${numero2} = ${resultado}`
        };
        const nuevoPuntaje : number = this.calcularNuevoPuntaje(resultado, req);
        if(nuevoPuntaje <= 0){
          res.cookie('puntaje', 100, {signed: true});
          mensaje["aviso"] = `${req.cookies.token}, tu puntaje se ha reiniciado a 100`
        }else{
          res.cookie('puntaje', nuevoPuntaje, {signed: true});
        }
        res.send(mensaje)
      }
    } catch (e) {
      console.log(e);
      throw new BadRequestException(this.mensajeErrorIngresarDatos);
    }

  }

  @Put('restar')
  @HttpCode(201)
  async restar( // n1 body n2 body
    @Req() req,
    @Res() res,
    @Body() parametrosDeCuerpo
  ){
    if(!this.hayToken(req)){
      throw new BadRequestException("Registrese para utilizar la calculadora")
    }
    const numero1 = parametrosDeCuerpo.numero1;
    const numero2 = parametrosDeCuerpo.numero2;
    const numeros = new CalculadoraSumarRestarMultiplicarDto();
    numeros.numero1 = Number(numero1);
    numeros.numero2 = Number(numero2);

    try {
      const errores: ValidationError[] = await validate(numeros);
      if (errores.length > 0) {
        console.error('Errores', errores);
        throw new BadRequestException('Ingreso de datos equivocado');
      }else {
        const resultado : number = this._calculadoraService
          .restar(
            Number(numero1),
            Number(numero2)
          );
        const mensaje = {
          resultado: `${numero1} - ${numero2} = ${resultado}`
        };
        const nuevoPuntaje : number = this.calcularNuevoPuntaje(resultado, req);
        if(nuevoPuntaje <= 0){
          res.cookie('puntaje', 100, {signed: true});
          mensaje["aviso"] = `${req.cookies.token}, tu puntaje se ha reiniciado a 100`
        }else{
          res.cookie('puntaje', nuevoPuntaje, {signed: true});
        }
        res.send(mensaje)
      }
    } catch (e) {
      console.log(e);
      throw new BadRequestException(this.mensajeErrorIngresarDatos);
    }

  }

  @Delete('multiplicar')
  @HttpCode(200)
  async multiplicar( // n1 header n2 header
    @Req() req,
    @Res() res
  ){
    if(!this.hayToken(req)){
      throw new BadRequestException("Registrese para utilizar la calculadora")
    }
    const numero1 = req.headers.numero1;
    const numero2 = req.headers.numero2;
    const numeros = new CalculadoraSumarRestarMultiplicarDto();
    numeros.numero1 = Number(numero1);
    numeros.numero2 = Number(numero2);

    try {
      const errores: ValidationError[] = await validate(numeros);
      if (errores.length > 0) {
        console.error('Errores', errores);
        throw new BadRequestException('Ingreso de datos equivocado');
      }else {
        const resultado : number = this._calculadoraService
          .multiplicar(
            Number(numero1),
            Number(numero2)
          );
        const mensaje = {
          resultado: `${numero1} * ${numero2} = ${resultado}`
        };
        const nuevoPuntaje : number = this.calcularNuevoPuntaje(resultado, req);
        if(nuevoPuntaje <= 0){
          res.cookie('puntaje', 100, {signed: true});
          mensaje["aviso"] = `${req.cookies.token}, tu puntaje se ha reiniciado a 100`
        }else{
          res.cookie('puntaje', nuevoPuntaje, {signed: true});
        }
        res.send(mensaje)
      }
    } catch (e) {
      console.log(e);
      throw new BadRequestException(this.mensajeErrorIngresarDatos);
    }
  }

  @Post('dividir/numero1/:numero1/numero2/:numero2')
  @HttpCode(201)
  async dividir(  // n1 ruta n2 ruta
    @Req() req,
    @Res() res,
    @Param() parametrosRuta
  ){

    if(!this.hayToken(req)){
      throw new BadRequestException("Registrese para utilizar la calculadora")
    }
    const numero1 = parametrosRuta.numero1;
    const numero2 = parametrosRuta.numero2;
    const numeros = new CalculadoraDividirDto();
    numeros.numero1 = Number(numero1);
    numeros.numero2 = Number(numero2);

    try {
      const errores: ValidationError[] = await validate(numeros);
      if (errores.length > 0) {
        console.error('Errores', errores);
        throw new BadRequestException('Ingreso de datos equivocado');
      }else {
        const resultado : number = this._calculadoraService
          .dividir(
            Number(numero1),
            Number(numero2)
          );
        const mensaje = {
          resultado: `${numero1} / ${numero2} = ${resultado}`
        };
        const nuevoPuntaje : number = this.calcularNuevoPuntaje(resultado, req);
        if(nuevoPuntaje <= 0){
          res.cookie('puntaje', 100, {signed: true});
          mensaje["aviso"] = `${req.cookies.token}, tu puntaje se ha reiniciado a 100`
        }else{
          res.cookie('puntaje', nuevoPuntaje, {signed: true});
        }
        res.send(mensaje)
      }
    } catch (e) {
      console.log(e);
      throw new BadRequestException(this.mensajeErrorIngresarDatos);
    }

  }

  @Get('registrarse')
  registrarse(
    @Query() parametrosConsulta,
    @Req() req, //  request - PETICION
    @Res() res // response - RESPUESTA
  ) {

    res.cookie(
      'token', // nombre
      parametrosConsulta.nombre, // valor
    );

    res.cookie('puntaje', 100, {signed: true});
    const mensaje = {
      mensaje: `Bienvenido ${parametrosConsulta.nombre}!` ,
    };
    // return mensaje; // NO SE PUEDE USAR RETURN CUANDO SE USA @Res() OJO !!!
    res.send(mensaje.mensaje); // METODO EXPRESSJS
  }

  calcularNuevoPuntaje(resultadoOperacion: number, req): number{
    const puntajeActual = Number(req.signedCookies.puntaje);
    const resultadoAbsoluto = Math.abs(resultadoOperacion);
    return puntajeActual - resultadoAbsoluto
  }

  hayToken(
    req
  ): boolean{
    return (req.cookies.token)? true: false;
  }

}