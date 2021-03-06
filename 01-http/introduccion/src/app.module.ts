import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpJuegoModule } from './http/http-juego.module';
import { CalculadoraModule } from './calculadora/calculadora.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario/usuario.entity';
import { MascotaModule } from './mascota/mascota.module';
import { VacunaModule } from './vacuna/vacuna.module';
import { MascotaEntity } from './mascota/mascota.entity';
import { VacunaEntity } from './vacuna/vacuna.entity';

@Module({
  imports: [
    //Se importan otros módulos
    TypeOrmModule.forRoot({
      name: 'default', //nombre de la conexion
      type: 'mysql',  // tipo de BD
      host: 'localhost',
      port: 32769,
      username: 'mysql-web-clases', //usuario
      password: 'laclaveesunfactorimportante12345', //pass
      database: 'mysql-web-clases', // nombre BD
      entities: [ // Poner todas las entidades de la BD
        UsuarioEntity,
        MascotaEntity,
        VacunaEntity
      ],
      synchronize: true, // actualiza el esquema de la BD
      dropSchema: false, // vuelve a crear el esquema de la base de datos
    }),
    HttpJuegoModule,
    CalculadoraModule,
   UsuarioModule,
   MascotaModule,
   VacunaModule,
  ],
  controllers: [
    // Controladores del app module
    AppController
  ],
  providers: [
    // Service del APP module
    AppService],
})
export class AppModule {}
