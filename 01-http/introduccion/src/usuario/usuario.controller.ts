import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController{
  constructor(private  readonly _usuarioService: UsuarioService) {
  }
  public arregloUsuarios = [
    {
      id: 1,
      nombre: "Andres"
    },
    {
      id: 2,
      nombre: "Daniel"
    },
    {
      id: 3,
      nombre: "Analía"
    }
  ];
  public idActual: number = 3;

  @Get()
  mostrarTodos(){
    return this.arregloUsuarios
  }
  @Get('/:idUsuario')
  mostrarUno(
    @Param() parametrosDeRuta
  ){
    const idUsuario = Number(parametrosDeRuta.idUsuario);
    const indice = this.arregloUsuarios.findIndex((usuario) =>
      usuario.id === idUsuario
    );
    return this.arregloUsuarios[indice]
  }
  @Post()
  crearUno(
    @Body() parametrosDeCuerpo
  ){
    const nuevoUsuario = {
      id: this.idActual + 1,
      nombre: parametrosDeCuerpo.nombre
    };
    this.arregloUsuarios.push(
      nuevoUsuario
    );
    this.idActual += 1;
    return nuevoUsuario;
  }
  @Put('/:idUsuario')
  editarUno(
    @Param() parametrosDeRuta,
    @Body() parametrosDeCuerpo
  ){
    const idUsuario = Number(parametrosDeRuta.idUsuario);
    const indice = this.arregloUsuarios.findIndex((usuario) =>
      usuario.id === idUsuario
    );
    this.arregloUsuarios[indice].nombre = parametrosDeCuerpo.nombre;
    return this.arregloUsuarios[indice]
  }
  @Delete('/:idUsuario')
  eliminarUno(
    @Param() parametrosDeRuta
  ){
    const idUsuario = Number(parametrosDeRuta.idUsuario);
    const indice = this.arregloUsuarios.findIndex((usuario) =>
      usuario.id === idUsuario
    );
    const usuarioEliminado = this.arregloUsuarios.splice(indice, 1);
    return usuarioEliminado
  }

}