import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [UsuarioController],
    providers: [UsuarioService],
})
export class UsuarioModule {}