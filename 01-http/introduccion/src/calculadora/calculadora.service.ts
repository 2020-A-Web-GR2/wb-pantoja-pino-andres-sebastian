import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculadoraService {

  sumar(numero1: number, numero2: number): number{
    return numero1 + numero2
  }
  restar(numero1: number, numero2: number): number{
    return numero1 - numero2
  }
  multiplicar(numero1: number, numero2: number): number{
    return numero1 * numero2
  }
  dividir(numero1: number, numero2: number): number{
    return numero1 / numero2
  }

}