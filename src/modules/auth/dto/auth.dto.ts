import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { UserDto } from '@/modules/user/dto/user.dto';

export class AuthDto extends UserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class GetAuthDto {
  @Expose()
  access_token: string;
}
