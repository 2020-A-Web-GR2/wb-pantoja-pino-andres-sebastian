import { IsAlpha, IsBoolean, IsEmpty, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class MascotaCreateDto{
  @IsAlpha()
  @MinLength()
  @MaxLength()
  @IsNotEmpty()
  nombre:string

  // @IsBoolean()
  // @IsEmpty()
}