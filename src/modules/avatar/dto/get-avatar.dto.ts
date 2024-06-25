import { Expose } from 'class-transformer';

export class GetAvatarDto {
  @Expose()
  id: number;

  @Expose()
  image: string;
}
