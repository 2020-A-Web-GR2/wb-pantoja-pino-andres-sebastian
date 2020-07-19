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
  funciona(): string{
    return 'funciona'
  }

  @Get('sumar')
  @HttpCode(200)
  async sumar( // n1 query n2 query
    @Req() req,
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
        return `${numero1} + ${numero2} = ${resultado}`
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
        return `${numero1} - ${numero2} = ${resultado}`
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
        return `${numero1} * ${numero2} = ${resultado}`
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
        return `${numero1} / ${numero2} = ${resultado}`
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
    const mensaje = {
      mensaje: `Bienvenido ${parametrosConsulta.nombre}!` ,
    };
    // return mensaje; // NO SE PUEDE USAR RETURN CUANDO SE USA @Res() OJO !!!
    res.send(mensaje.mensaje); // METODO EXPRESSJS
  }



  hayToken(
    req
  ): boolean{
    return (req.cookies.token)? true: false;
  }

}