import { AvatarRepository } from './avatar.repository';
import { AvatarService } from './avatar.service';
import { BusinessRuleException } from '@/helpers/error/BusinessRuleException';
import { CharacterService } from '../character/character.service';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { ResponseMessage } from '@/helpers/ResponseMessage';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateAvatarDto } from './dto/update-avatar.dto';

describe('AvatarService', () => {
  let service: AvatarService;
  let repository: AvatarRepository;
  let characterService: CharacterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvatarService,
        {
          provide: AvatarRepository,
          useValue: {
            create: jest.fn(),
            get: jest.fn(),
            getAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: CharacterService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AvatarService>(AvatarService);
    repository = module.get<AvatarRepository>(AvatarRepository);
    characterService = module.get<CharacterService>(CharacterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new avatar', async () => {
      const dto: CreateAvatarDto = { image: 'test.jpg', characterId: 1 };
      const createdAvatar = { id: 1, ...dto };

      jest.spyOn(characterService, 'get').mockResolvedValue({
        id: dto.characterId,
        name: 'Test Character',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      jest.spyOn(repository, 'create').mockResolvedValue(createdAvatar);

      const result = await service.create(dto);
      expect(result).toEqual(createdAvatar);
      expect(characterService.get).toHaveBeenCalledWith(dto.characterId);
      expect(repository.create).toHaveBeenCalledWith({
        data: {
          image: dto.image,
          character: { connect: { id: dto.characterId } },
        },
      });
    });

    it('should throw an error if character does not exist when creating avatar', async () => {
      const dto: CreateAvatarDto = { image: 'test.jpg', characterId: 1 };

      jest.spyOn(characterService, 'get').mockImplementation(() => {
        throw new BusinessRuleException('Personagem não encontrado');
      });

      await expect(service.create(dto)).rejects.toThrow(BusinessRuleException);
    });
  });

  describe('get', () => {
    it('should return an avatar if it exists', async () => {
      const avatar = { id: 1, image: 'test.jpg', characterId: 1 };

      jest.spyOn(repository, 'get').mockResolvedValue(avatar);

      const result = await service.get(1);
      expect(result).toEqual(avatar);
    });

    it('should throw an error if avatar does not exist', async () => {
      jest.spyOn(repository, 'get').mockResolvedValue(null);

      await expect(service.get(1)).rejects.toThrow(BusinessRuleException);
    });
  });

  describe('getAll', () => {
    it('should return an array of avatars', async () => {
      const avatars = [{ id: 1, image: 'test.jpg', characterId: 1 }];

      jest.spyOn(repository, 'getAll').mockResolvedValue(avatars);

      const result = await service.getAll();
      expect(result).toEqual(avatars);
    });
  });

  describe('update', () => {
    it('should update an avatar', async () => {
      const dto: UpdateAvatarDto = { id: 1, image: 'updated.jpg', characterId: 1 };
      const existingAvatar = { id: 1, image: 'test.jpg', characterId: 1 };
      const updatedAvatar = { ...existingAvatar, ...dto };

      jest.spyOn(service, 'get').mockResolvedValue(existingAvatar);
      jest.spyOn(characterService, 'get').mockResolvedValue({
        id: dto.characterId,
        name: 'Test Character',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      jest.spyOn(repository, 'update').mockResolvedValue(updatedAvatar);

      const result = await service.update(dto);
      expect(result).toEqual(updatedAvatar);
      expect(service.get).toHaveBeenCalledWith(dto.id);
      expect(characterService.get).toHaveBeenCalledWith(dto.characterId);
      expect(repository.update).toHaveBeenCalledWith({
        data: dto,
        where: { id: dto.id },
      });
    });

    it('should throw an error if the avatar to be updated does not exist', async () => {
      const dto: UpdateAvatarDto = { id: 1, image: 'updated.jpg', characterId: 1 };

      jest.spyOn(service, 'get').mockImplementation(() => {
        throw new BusinessRuleException('Avatar não encontrado');
      });

      await expect(service.update(dto)).rejects.toThrow(BusinessRuleException);
    });

    it('should throw an error if character does not exist when updating avatar', async () => {
      const dto: CreateAvatarDto = { image: 'test.jpg', characterId: 1 };

      jest.spyOn(characterService, 'get').mockImplementation(() => {
        throw new BusinessRuleException('Personagem não encontrado');
      });

      await expect(service.create(dto)).rejects.toThrow(BusinessRuleException);
    });
  });

  describe('delete', () => {
    it('should delete an avatar', async () => {
      const existingAvatar = { id: 1, image: 'test.jpg', characterId: 1 };

      jest.spyOn(service, 'get').mockResolvedValue(existingAvatar);
      jest.spyOn(repository, 'delete').mockResolvedValue(existingAvatar);

      const result = await service.delete(1);
      expect(result).toBeInstanceOf(ResponseMessage);
      expect(result.message).toEqual('Avatar deletado com sucesso');
    });

    it('should throw an error if the avatar to be deleted does not exist', async () => {
      jest.spyOn(service, 'get').mockImplementation(() => {
        throw new BusinessRuleException('Avatar não encontrado');
      });

      await expect(service.delete(1)).rejects.toThrow(BusinessRuleException);
    });
  });
});
