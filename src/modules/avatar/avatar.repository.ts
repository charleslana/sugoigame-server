import { Avatar, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class AvatarRepository {
  constructor(private prisma: PrismaService) {}

  async create(params: { data: Prisma.AvatarCreateInput }): Promise<Avatar> {
    const { data } = params;
    return this.prisma.avatar.create({
      data: data,
    });
  }

  async findById(id: number): Promise<Avatar | null> {
    return this.prisma.avatar.findUnique({
      where: {
        id,
      },
    });
  }

  async get(where: Prisma.AvatarWhereUniqueInput): Promise<Avatar | null> {
    return this.prisma.avatar.findUnique({ where });
  }

  async getAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AvatarWhereUniqueInput;
    where?: Prisma.AvatarWhereInput;
    orderBy?: Prisma.AvatarOrderByWithRelationInput;
  }): Promise<Avatar[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.avatar.findMany({ skip, take, cursor, where, orderBy });
  }

  async update(params: {
    where: Prisma.AvatarWhereUniqueInput;
    data: Prisma.AvatarUpdateInput;
  }): Promise<Avatar> {
    const { where, data } = params;
    return this.prisma.avatar.update({ where, data });
  }

  async delete(params: { where: Prisma.AvatarWhereUniqueInput }): Promise<Avatar> {
    const { where } = params;
    return this.prisma.avatar.delete({ where });
  }
}
