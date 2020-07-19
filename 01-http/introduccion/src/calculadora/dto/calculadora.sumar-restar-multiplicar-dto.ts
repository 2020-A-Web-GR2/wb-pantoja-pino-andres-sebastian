import { IsNotEmpty, IsNumber } from 'class-validator';

export class CalculadoraSumarRestarMultiplicarDto{
  @IsNumber()
  @IsNotEmpty()
  numero1: number = null;

  @IsNumber()
  @IsNotEmpty()
  numero2: number = null;
}