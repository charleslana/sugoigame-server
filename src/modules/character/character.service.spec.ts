import { BusinessRuleException } from '@/helpers/error/BusinessRuleException';
import { CharacterRepository } from './character.repository';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { PrismaService } from '@/database/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCharacterDto } from './dto/update-character.dto';

describe('CharacterService', () => {
  let service: CharacterService;
  let repository: CharacterRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterService, CharacterRepository, PrismaService],
    }).compile();

    service = module.get<CharacterService>(CharacterService);
    repository = module.get<CharacterRepository>(CharacterRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new character', async () => {
      const dto: CreateCharacterDto = {
        name: 'Test Character',
      };

      jest.spyOn(repository, 'findByName').mockResolvedValue(null);
      jest.spyOn(repository, 'create').mockResolvedValue({
        id: 1,
        name: dto.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.create(dto);
      expect(result).toBeDefined();
      expect(result.name).toEqual(dto.name);
    });

    it('should throw an error if character name already exists', async () => {
      const dto: CreateCharacterDto = {
        name: 'Existing Character',
      };

      jest.spyOn(repository, 'findByName').mockResolvedValue({
        id: 1,
        name: dto.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await expect(service.create(dto)).rejects.toThrow(BusinessRuleException);
    });
  });

  describe('get', () => {
    it('should return a character if it exists', async () => {
      const character = {
        id: 1,
        name: 'Test Character',
        createdAt: new Date(),
        updatedAt: new Date(),
        avatars: [],
      };

      jest.spyOn(repository, 'get').mockResolvedValue(character);

      const result = await service.get(1);
      expect(result).toEqual(character);
    });

    it('should throw an error if character does not exist', async () => {
      jest.spyOn(repository, 'get').mockResolvedValue(null);

      await expect(service.get(1)).rejects.toThrow(BusinessRuleException);
    });
  });

  describe('getAll', () => {
    it('should return an array of characters', async () => {
      const characters = [
        {
          id: 1,
          name: 'Character 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          avatars: [],
        },
        {
          id: 2,
          name: 'Character 2',
          createdAt: new Date(),
          updatedAt: new Date(),
          avatars: [],
        },
      ];

      jest.spyOn(repository, 'getAll').mockResolvedValue(characters);

      const result = await service.getAll();
      expect(result).toEqual(characters);
    });
  });

  describe('update', () => {
    it('should update a character', async () => {
      const dto: UpdateCharacterDto = {
        id: 1,
        name: 'Updated Character',
      };

      const existingCharacter = {
        id: 1,
        name: 'Test Character',
        createdAt: new Date(),
        updatedAt: new Date(),
        avatars: [],
      };

      jest.spyOn(service, 'get').mockResolvedValue(existingCharacter);
      jest.spyOn(repository, 'findByName').mockResolvedValue(null);
      jest.spyOn(repository, 'update').mockResolvedValue({
        ...existingCharacter,
        ...dto,
      });

      const result = await service.update(dto);
      expect(result).toBeDefined();
      expect(result.name).toEqual(dto.name);
    });

    it('should throw an error if updated name already exists', async () => {
      const dto: UpdateCharacterDto = {
        id: 1,
        name: 'Existing Character',
      };

      const existingCharacter = {
        id: 1,
        name: 'Test Character',
        createdAt: new Date(),
        updatedAt: new Date(),
        avatars: [],
      };

      jest.spyOn(service, 'get').mockResolvedValue(existingCharacter);
      jest.spyOn(repository, 'findByName').mockResolvedValue({
        id: 2,
        name: dto.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await expect(service.update(dto)).rejects.toThrow(BusinessRuleException);
    });
  });

  describe('delete', () => {
    it('should delete a character', async () => {
      const existingCharacter = {
        id: 1,
        name: 'Test Character',
        createdAt: new Date(),
        updatedAt: new Date(),
        avatars: [],
      };

      jest.spyOn(service, 'get').mockResolvedValue(existingCharacter);
      jest.spyOn(repository, 'delete').mockResolvedValue(existingCharacter);

      const result = await service.delete(1);
      expect(result).toBeDefined();
      expect(result.message).toEqual('Personagem deletado com sucesso');
    });

    it('should throw an error if character does not exist', async () => {
      jest.spyOn(service, 'get').mockImplementation(() => {
        throw new BusinessRuleException('Personagem não encontrado');
      });

      await expect(service.delete(1)).rejects.toThrow(BusinessRuleException);
    });
  });
});
