import { IsEnum, MinLength } from 'class-validator';

export class CreateNinjaDto {
  @MinLength(3)
  name: string;

  @IsEnum(['stars', 'sword'], { message: 'Use Correct Weapon!' })
  weapon: string;
}
