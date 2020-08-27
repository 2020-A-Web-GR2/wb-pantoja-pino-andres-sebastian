import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(// Se hace la inyección de dependencias
    @InjectRepository(UsuarioEntity) private usuarioRepository: Repository<UsuarioEntity>,
  ) {
  }


   findAll(){
    return this.usuarioRepository.find()
  }

  findOne(id:number){
    return this.usuarioRepository.findOne(id)
  }


  createOne(newUser) {
    const savedUser = this.usuarioRepository
      .save(newUser);
    return savedUser;
  }

  editOne( editedUser){
    return  this.usuarioRepository.save(editedUser);

  }

  edeleteOne(id: number) {
    return this.usuarioRepository.delete(id);
  }




}
