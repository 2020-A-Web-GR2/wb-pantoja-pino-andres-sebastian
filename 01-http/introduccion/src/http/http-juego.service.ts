import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpJuegoService {

  saludar(): string {
    return 'Hola';
  }

}