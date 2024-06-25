import { IsInt, IsNotEmpty, MaxLength, Min, MinLength } from 'class-validator';

export class UpdateCharacterDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  name: string;
}
