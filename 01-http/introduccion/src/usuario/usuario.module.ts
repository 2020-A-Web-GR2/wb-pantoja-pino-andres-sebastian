import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { MascotaService } from '../mascota/mascota.service';
import { MascotaModule } from '../mascota/mascota.module';


@Module({
  imports: [
    MascotaModule,
    TypeOrmModule.forFeature(
      [
        UsuarioEntity,
      ],
      'default',
    )
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {
}