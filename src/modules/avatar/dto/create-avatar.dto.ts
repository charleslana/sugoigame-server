import { IsInt, IsNotEmpty, MaxLength, Min, MinLength } from 'class-validator';

export class CreateAvatarDto {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  image: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  characterId: number;
}
