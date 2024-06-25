import { Avatar } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { GetAvatarDto } from '@/modules/avatar/dto/get-avatar.dto';

export class GetCharacterDto {
  @Expose()
  id: number;

  @Expose()
  name: string | null;

  @Expose()
  @Type(() => GetAvatarDto)
  avatars: Avatar[];
}
