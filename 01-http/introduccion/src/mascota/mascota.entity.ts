import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { type } from 'os';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { VacunaEntity } from '../vacuna/vacuna.entity';

@Entity('mascota')
export class MascotaEntity {
  @PrimaryGeneratedColumn({
    name: 'id_mascota',
    unsigned: true,
  })
  idMascota: number;


  @Column({
    name: 'nombre',
    type: 'varchar',
    length: '64',
    nullable: false,
  })
  nombre: string;


  @ManyToOne(
    type1 => UsuarioEntity, // Con quien me voy a relacionar.
    //Campo con el que me voy a relacionar
    usuario => usuario.mascotas,
  )
    //Cada mascota tiene un usuario
  usuario: UsuarioEntity;

  @OneToMany(
    type => VacunaEntity,
    vacuna => vacuna.mascota,
  )
  vacunas: VacunaEntity[];


}