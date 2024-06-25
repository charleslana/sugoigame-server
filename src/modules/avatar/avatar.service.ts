import { AvatarRepository } from './avatar.repository';
import { BusinessRuleException } from '@/helpers/error/BusinessRuleException';
import { CharacterService } from '../character/character.service';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { Injectable } from '@nestjs/common';
import { ResponseMessage } from '@/helpers/ResponseMessage';
import { UpdateAvatarDto } from './dto/update-avatar.dto';

@Injectable()
export class AvatarService {
  constructor(
    private repository: AvatarRepository,
    private characterService: CharacterService
  ) {}

  async create(dto: CreateAvatarDto) {
    await this.characterService.get(dto.characterId);
    const create = await this.repository.create({
      data: {
        image: dto.image,
        character: {
          connect: { id: dto.characterId },
        },
      },
    });
    return create;
  }

  async get(id: number) {
    const get = await this.repository.get({ id });
    if (!get) {
      throw new BusinessRuleException('Avatar não encontrado');
    }
    return get;
  }

  async getAll() {
    const getAll = await this.repository.getAll({});
    return getAll;
  }

  async update(dto: UpdateAvatarDto) {
    await this.get(dto.id);
    await this.characterService.get(dto.characterId);
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
    return new ResponseMessage('Avatar deletado com sucesso');
  }
}
