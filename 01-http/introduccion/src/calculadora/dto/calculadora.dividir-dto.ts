import { IsNotEmpty, IsNumber, NotEquals } from 'class-validator';

export class CalculadoraDividirDto{
  @IsNumber()
  @IsNotEmpty()
  numero1: number = null;

  @IsNumber()
  @IsNotEmpty()
  @NotEquals(0)
  numero2: number = null;

}