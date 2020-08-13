import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException, NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly _usuarioService: UsuarioService) {
  }

  public arregloUsuarios = [
    {
      id: 1,
      nombre: 'Andres',
    },
    {
      id: 2,
      nombre: 'Daniel',
    },
    {
      id: 3,
      nombre: 'Analía',
    },
  ];
  public idActual: number = 3;

  @Get()
  async mostrarTodos() {
    try {
      const response = await this._usuarioService.findAll();
      return response;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException({
        mensaje: 'Error del servidor',
      });
    }
  }


  @Get('/:idUsuario')
  async mostrarUno(
    @Param() parametrosDeRuta,
  ) {
    let response;
    try {
      response = await this._usuarioService.findOne(
        Number(parametrosDeRuta.idUsuario));

    } catch (e) {
      console.log(e);
      throw new BadRequestException({
        mensaje: 'Usuario no encontrado',
      });
    }
    if (response) {
      return response;
    } else {
      throw new NotFoundException({
        mensaje: 'Usuario no encontrado',
      });
    }
  }

  @Post()
  async crearUno(
    @Body() parametrosDeCuerpo,
  ) {
    try {
      // TODO: IMPLEMENTAR VALIDACION CON CREATE DTO y ENVIO A CREAR

      const response = await this._usuarioService.createOne(parametrosDeCuerpo);
      return response;
    } catch (e) {
      console.log(e);
      throw new BadRequestException({
        mensaje: 'Error validating data',
      });
    }
  }

  @Put('/:idUsuario')
  editarUno(
    @Param() parametrosDeRuta,
    @Body() parametrosDeCuerpo,
  ) {
    const idUsuario = Number(parametrosDeRuta.idUsuario);
    const indice = this.arregloUsuarios.findIndex((usuario) =>
      usuario.id === idUsuario,
    );
    this.arregloUsuarios[indice].nombre = parametrosDeCuerpo.nombre;
    return this.arregloUsuarios[indice];
  }

  @Delete('/:idUsuario')
  eliminarUno(
    @Param() parametrosDeRuta,
  ) {
    const idUsuario = Number(parametrosDeRuta.idUsuario);
    const indice = this.arregloUsuarios.findIndex((usuario) =>
      usuario.id === idUsuario,
    );
    const usuarioEliminado = this.arregloUsuarios.splice(indice, 1);
    return usuarioEliminado;
  }


}