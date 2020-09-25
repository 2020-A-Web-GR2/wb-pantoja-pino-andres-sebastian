import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, IsNull, LessThan, Like, Not, Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(// Se hace la inyección de dependencias
    @InjectRepository(UsuarioEntity) private usuarioRepository: Repository<UsuarioEntity>,
  ) {
  }


   findAll(textoConsulta: string){

    // let busquedaEjemplo: FindManyOptions<UsuarioEntity>
    //
    //  // busquedas con relaciones
    //  busquedaEjemplo = {
    //     relations: ['mascotas', 'mascotas.vacunas']
    //  }
    //
    //  // con where
    //  busquedaEjemplo = {
    //   where: {
    //     apellido: 'Pantoja', // Busqueda exacta &
    //     nombre: 'Andrés'
    //   }
    //  }
    //  // ordenar
    //  busquedaEjemplo = {
    //   order: {
    //     nombre: 'ASC',
    //     id: 'DESC'
    //   }
    //  }
    //  //paginacion
    //  busquedaEjemplo = {
    //     skip: 5,
    //     take: 10
    //  };
    // //where or
    //
    //  busquedaEjemplo = {
    //    where: [
    //      {
    //        nombre: 'Andrés'
    //      }, //or
    //      {
    //        apellido: 'Pantoja'
    //      }
    //    ]
    //  }
    //  //not
    //  busquedaEjemplo = {
    //    where: {
    //      nombre: Not('Andrés')
    //
    //    }
    //  }
    //  //Less than
    //  busquedaEjemplo = {
    //    where: {
    //      nombre: LessThan('1999-02-02')
    //      // Del mismo modo LessThanOrEqual, MoreThanOrEqual, MoreThanOrEqual
    //
    //    }
    //  }
    //  // Parámetros de where
    //  busquedaEjemplo = {
    //    where: {
    //      nombre: Like('%ndr%'),
    //      mascotas: In([1,2,3,4]),
    //      sueldo: IsNull()
    //      // No olvidar los porcentajes
    //    }
    //  }



     const consulta: FindManyOptions<UsuarioEntity> =
       {
         where: [
           {
             nombre: Like(`%${textoConsulta}%`)
           },
           {
             apellido: Like(`%${textoConsulta}%`)
           },
           {
             cedula: Like(`%${textoConsulta}%`)
           }
         ]
       }

    return this.usuarioRepository.find(consulta)
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
