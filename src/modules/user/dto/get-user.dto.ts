import { GenderEnum } from '@prisma/client';
import { Expose } from 'class-transformer';

export class GetUserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  username: string;

  @Expose()
  gender: GenderEnum;

  @Expose()
  credit: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

export class GetUserExposeDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
