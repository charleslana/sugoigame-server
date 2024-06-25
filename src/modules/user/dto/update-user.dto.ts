import { Exclude } from 'class-transformer';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { UserDto } from './user.dto';

export class UpdateUserDto {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  @Matches(/^[a-zA-Z ]*$/, { message: 'O nome deve conter apenas letras e espaço' })
  name: string;

  @Exclude()
  id: number;
}

export class UpdateUserPasswordDto extends UserDto {
  @IsNotEmpty()
  currentPassword: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  newPassword: string;

  @Exclude()
  id: number;
}
