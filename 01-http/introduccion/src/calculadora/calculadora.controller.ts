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

@Controller('calculadora')
export class CalculadoraController{

  constructor(private readonly _calculadoraService: CalculadoraService) {
  }

  @Get('')
  funciona(): string{
    return 'funciona'
  }

  @Get('sumar')
  @HttpCode(200)
  sumar(
    @Query() parametrosDeRuta
  ): number{
    // n1 query n2 query
    return Number(parametrosDeRuta.numero1) + Number(parametrosDeRuta.numero2)
  }

  @Put('restar')
  @HttpCode(201)
  restar(
    @Body() parametrosDeCuerpo
  ): number{
    // n1 body n2 body
    return Number(parametrosDeCuerpo.numero1) + Number(parametrosDeCuerpo.numero2)
  }

  @Delete('multiplicar')
  @HttpCode(200)
  multiplicar(
    @Req() req,
  ): number{
    // n1 header n2 header
    console.log(req.headers, typeof req.headers.numero1);
    return Number(req.headers.numero1) * Number(req.headers.numero2)
  }

  @Post('dividir/numero1/:numero1/numero2/:numero2')
  @HttpCode(201)
  dividir(
    @Param() parametrosRuta
  ): number{
    // n1 ruta n2 ruta
    return  Number(parametrosRuta.numero1) / Number(parametrosRuta.numero2)
  }

  @Get('registrarse')
  guardarCookieInsegura(
    @Query() parametrosConsulta,
    @Req() req, //  request - PETICION
    @Res() res // response - RESPUESTA
  ) {
    res.cookie(
      'token', // nombre
      parametrosConsulta.nombre, // valor
    );
    const mensaje = {
      mensaje: 'ok',
      nombre: parametrosConsulta.nombre,
    };
    // return mensaje; // NO SE PUEDE USAR RETURN CUANDO SE USA @Res() OJO !!!
    res.send(mensaje); // METODO EXPRESSJS
  }

  @Get('probarToken')
  probarToken(
    @Req() req
  ){
    if(req.cookies.token){
      return req.cookies.token
    }else {
      return false
    }
  }

}