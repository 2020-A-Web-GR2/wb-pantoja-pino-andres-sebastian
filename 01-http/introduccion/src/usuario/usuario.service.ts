import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(// Se hace la inyección de dependencias
    @InjectRepository(UsuarioEntity) private usuarioRepository: Repository<UsuarioEntity>
  ) {
  }

  crearUno(nuevoUsuario: UsuarioEntity){
    this.usuarioRepository
      .save(nuevoUsuario)
  }

}
