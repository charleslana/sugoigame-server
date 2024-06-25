import { GenderEnum } from '@prisma/client';
import { UserDto } from './user.dto';
import {
  IsEmail,
  IsEnum,
  IsLowercase,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';

export class CreateUserDto extends UserDto {
  @IsEmail()
  @IsLowercase()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  password: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @NotContains(' ')
  @Matches(/^[a-zA-Z0-9]*$/, { message: 'O nome do usuário deve conter apenas letras e números' })
  username: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  @Matches(/^[a-zA-Z ]*$/, { message: 'O nome deve conter apenas letras e espaço' })
  name: string;

  @IsNotEmpty()
  @IsEnum(GenderEnum)
  gender: GenderEnum;
}
