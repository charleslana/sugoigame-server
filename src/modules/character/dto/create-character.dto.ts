import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateCharacterDto {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  name: string;
}
