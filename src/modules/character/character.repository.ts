import { Character, Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class CharacterRepository {
  constructor(private prisma: PrismaService) {}

  async create(params: { data: Prisma.CharacterCreateInput }): Promise<Character> {
    const { data } = params;
    return this.prisma.character.create({
      data: data,
    });
  }

  async findById(id: number): Promise<Character | null> {
    return this.prisma.character.findUnique({
      where: {
        id,
      },
    });
  }

  async findByName(name: string): Promise<Character | null> {
    return this.prisma.character.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async get(where: Prisma.CharacterWhereUniqueInput): Promise<Character | null> {
    return this.prisma.character.findUnique({
      where,
      include: {
        avatars: true,
      },
    });
  }

  async getAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CharacterWhereUniqueInput;
    where?: Prisma.CharacterWhereInput;
    orderBy?: Prisma.CharacterOrderByWithRelationInput;
  }): Promise<Character[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.character.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        avatars: true,
      },
    });
  }

  async update(params: {
    where: Prisma.CharacterWhereUniqueInput;
    data: Prisma.CharacterUpdateInput;
  }): Promise<Character> {
    const { where, data } = params;
    return this.prisma.character.update({ where, data });
  }

  async delete(params: { where: Prisma.CharacterWhereUniqueInput }): Promise<Character> {
    const { where } = params;
    return this.prisma.character.delete({ where });
  }
}
