import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MascotaEntity } from '../mascota/mascota.entity';

@Index([
  'nombre',
  'apellido',
  'cedula',
  'fechaNacimiento', //Nombres de las propiedades en la clase
])

@Index(['nombre', 'apellido', 'cedula'],
  {unique: true}
  )

@Entity('usuario')
export class UsuarioEntity{
  @PrimaryGeneratedColumn({
    unsigned: true,
    comment: 'Identificador'
  })
  idUsuario: number;

  @Column({
    name: 'nombre',
    type: 'varchar',
    length: '30',
    nullable: true
  })
  nombre?: string;

  @Column({
    name: 'apellido',
    type: 'varchar',
    length: '30',
    nullable: true
  })
  apellido?: string;

  @Column({
    name: 'cedula',
    type: 'varchar',
    length: '18',
    nullable: false,
    unique: true
  })
  cedula: string;

  @Column({
    name: 'sueldo',
    type: 'decimal',
    precision: 10,
    scale: 4,
    nullable: true
  })
  sueldo?: number;

  @Column({
    name: 'fecha_nacimiento',
    type: 'date',
    nullable: true
  })
  fechaNacimiento?: string;

  @Column({
    name: 'fecha_hora_nacimiento',
    type: 'datetime',
    nullable: true
  })
  fechaHoraNacimiento?: string;


  @OneToMany(
    type => MascotaEntity, //Con qué entidad me relaciono
    //Campos del mascota entity que voy a relacionar
    mascota => mascota.usuario
  )
  //Definir el nombre de la relacion con plural.
  // Un usuario tiene mascotas
  mascotas: MascotaEntity[]

}
