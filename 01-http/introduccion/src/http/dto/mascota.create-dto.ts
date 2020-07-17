import {
  IsAlpha,
  IsBoolean,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsNumber, IsOptional,
  IsPositive,
  MaxLength,
  MinLength,
} from 'class-validator';

export class MascotaCreateDto{
  @IsAlpha()
  @MinLength(3)
  @MaxLength(60)
  @IsNotEmpty()
  nombre:string = null;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  edad: number = null;

  @IsOptional()
  @IsBoolean()
  ligada?: boolean = null;

  @IsBoolean()
  @IsNotEmpty()
  casada: boolean = null;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  peso: number = null;




}