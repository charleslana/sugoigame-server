import { BusinessRuleException } from '@/helpers/error/BusinessRuleException';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { PageDto } from '@/dto/page.dto';
import { ResponseMessage } from '@/helpers/ResponseMessage';
import { UpdateUserDto, UpdateUserPasswordDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async create(dto: CreateUserDto) {
    const existsByName = await this.repository.findByUsername(dto.username);
    if (existsByName) {
      throw new BusinessRuleException('O nome do usuário já existe');
    }
    const existsByEmail = await this.repository.findByEmail(dto.email);
    if (existsByEmail) {
      throw new BusinessRuleException('O e-mail do usuário já existe');
    }
    dto.password = await dto.hashPassword(dto.password);
    const create = await this.repository.create({
      data: dto,
    });
    return create;
  }

  async get(id: number) {
    const get = await this.repository.get({ id });
    if (!get) {
      throw new BusinessRuleException('Usuário não encontrado');
    }
    return get;
  }

  async getAll() {
    const getAll = await this.repository.getAll({});
    return getAll;
  }

  async getPaginated(page: PageDto) {
    const paginated = await this.repository.findAllPaginated(page);
    return paginated;
  }

  async update(dto: UpdateUserDto) {
    await this.get(dto.id);
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
    return new ResponseMessage('Usuário deletado com sucesso');
  }

  async updateUserPassword(dto: UpdateUserPasswordDto) {
    const existingUser = await this.get(dto.id);
    const isPasswordValid = await dto.decryptPassword(dto.currentPassword, existingUser.password);
    if (!isPasswordValid) {
      throw new BusinessRuleException('Senha do usuário atual inválida');
    }
    const password = await dto.hashPassword(dto.newPassword);
    const user = await this.repository.update({
      data: {
        password,
      },
      where: {
        id: dto.id,
      },
    });
    return user;
  }

  async getByUsername(username: string) {
    const find = await this.repository.findByUsername(username);
    return find;
  }
}
