import { MascotaEntity } from './mascota.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MascotaService } from './mascota.service';

@Module({
    imports: [TypeOrmModule.forFeature([MascotaEntity])],
    providers: [MascotaService],
    exports: [MascotaService],
})
export class MascotaModule {}
