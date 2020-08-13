import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

export class UsuarioCreateDto {
  @IsString()
  @IsOptional()
  @MaxLength(30)
  nombre? : string;

  @IsString()
  @IsOptional()
  @MaxLength(30)
  apellido? : string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(18)
  cedula : string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  sueldo?: number






}