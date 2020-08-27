import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MascotaEntity } from '../mascota/mascota.entity';

@Entity('vacuna')
export class VacunaEntity {
  @PrimaryGeneratedColumn({
    name: 'id_vacuna',
    unsigned: true,
  })
  idVacuna: number;

  @Column({
    name: 'nombre',
    type: 'varchar',
    length: '64',
    nullable: false,
  })
  nombre: string;

  @ManyToOne(
    type => MascotaEntity,
    mascota => mascota.vacunas,
  )
  mascota: MascotaEntity;
}