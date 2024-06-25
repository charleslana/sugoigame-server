import { IsInt, IsNotEmpty, MaxLength, Min, MinLength } from 'class-validator';

export class UpdateAvatarDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  image: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  characterId: number;
}
