import { BusinessRuleException } from '@/helpers/error/BusinessRuleException';
import { CharacterRepository } from './character.repository';
import { CreateCharacterDto } from './dto/create-character.dto';
import { Injectable } from '@nestjs/common';
import { ResponseMessage } from '@/helpers/ResponseMessage';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Injectable()
export class CharacterService {
  constructor(private repository: CharacterRepository) {}

  async create(dto: CreateCharacterDto) {
    const exists = await this.repository.findByName(dto.name);
    if (exists) {
      throw new BusinessRuleException('O nome do personagem já existe');
    }
    const user = await this.repository.create({
      data: dto,
    });
    return user;
  }

  async get(id: number) {
    const get = await this.repository.get({ id });
    if (!get) {
      throw new BusinessRuleException('Personagem não encontrado');
    }
    return get;
  }

  async getAll() {
    const getAll = await this.repository.getAll({});
    return getAll;
  }

  async update(dto: UpdateCharacterDto) {
    const exists = await this.get(dto.id);
    if (dto.name) {
      const existsWithName = await this.repository.findByName(dto.name);
      if (existsWithName && existsWithName.id !== exists.id) {
        throw new BusinessRuleException('Nome do personagem já existe');
      }
    }
    const user = await this.repository.update({
      data: dto,
      where: {
        id: dto.id,
      },
    });
    return user;
  }

  async delete(id: number) {
    await this.get(id);
    await this.repository.delete({ where: { id } });
    return new ResponseMessage('Personagem deletado com sucesso');
  }
}
