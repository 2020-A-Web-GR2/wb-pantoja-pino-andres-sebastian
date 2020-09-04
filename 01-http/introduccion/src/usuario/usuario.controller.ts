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
  Query, Res,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { tryCatch } from 'rxjs/internal-compatibility';
import { MascotaService } from '../mascota/mascota.service';
import { UsuarioEntity } from './usuario.entity';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly _usuarioService: UsuarioService,
              private readonly _mascotaService: MascotaService) {
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

  @Put(':idUsuario')
  async editarUno(
    @Param() parametrosDeRuta,
    @Body() parametrosDeCuerpo,
  ) {
    try {
      const id = Number(parametrosDeRuta.idUsuario);
      const edited = parametrosDeCuerpo;
      edited.idUsuario = id;
      console.log(edited);

      // TODO: IMPLEMENTAR VALIDACION CON UPDATE DTO

      const response = await this._usuarioService.editOne(edited);
      return response;
    } catch (e) {
      console.log(e);
      throw new BadRequestException({
        mensaje: 'Error validating data',
      });
    }
  }


  @Delete(':idUsuario')
  async eliminarUno(
    @Param() parametrosDeRuta,
  ) {
    const id = Number(parametrosDeRuta.idUsuario);
    try {
      const response = await this._usuarioService.edeleteOne(id);
      return {
        mensaje: `Registro con id: ${id} eliminado`,
      };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException({
        mensaje: 'Error del servidor',
      });
    }
  }

  @Post('mascota')
  async crearUsuarioYMascota(
    @Body() parametrosDeCuerpo,
  ) {
    const usuario = parametrosDeCuerpo.usuario;
    const mascota = parametrosDeCuerpo.mascota;
    let usuarioCreado;
    try {
      //TODO: VALIDAR CON DTO
      usuarioCreado = await this._usuarioService.createOne(usuario);

    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException({
        mensaje: 'Error al crear usuario',
      });
    }
    let mascotaCreada;
    if (usuarioCreado) {
      try {
        mascota.usuario = usuarioCreado.idUsuario;
        mascotaCreada = await this._mascotaService.crearNuevaMascota(mascota);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException({
          meensaje: 'Error al crear mascota',
        });
      }
    }

    if (mascotaCreada) {
      return {
        mascota: mascotaCreada,
        usuario: usuarioCreado,
      };
    } else {
      throw new InternalServerErrorException({
        mensaje: 'Error al crear mascota',
      });
    }
  }

  @Get('vista/usuario')
  vistaUsuario(
    @Res() res,
  ) {
    const nombre = 'Andrés';
    res.render(
      'usuario/ejemplo', // nombre de la vista (archivo)
      { // params de la vista
        nombre,
      });
  }


  @Get('vista/faq')
  faq(
    @Res() res,
  ) {
    const nombre = 'Andrés';
    res.render(
      'usuario/faq', // nombre de la vista (archivo)
      { // params de la vista
        nombre,
      });
  }

  @Get('vista/login')
  login(
    @Res() res,
  ) {
    const nombre = 'Andrés';
    res.render(
      'usuario/login', // nombre de la vista (archivo)
      { // params de la vista
        nombre,
      });
  }


  @Get('vista/inicio')
  async inicio(
    @Res() res,
  ) {
    let usuarios;
    try {
      usuarios = await this._usuarioService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Error encontrando datos');
    }
    if (usuarios) {
      res.render(
        'usuario/inicio', // nombre de la vista (archivo)
        { // params de la vista

          usuarios,
        });
    } else {
      throw new NotFoundException('No se encontraron usuarios');
    }
  }

  @Get('/vista/crear')
  crearUsuarioVista(
    @Res() res
  ){
    res.render(
      'usuario/crear'
    )
  }

  @Post('/crearDesdeVista')
  async crearUsuarioVista(
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

}