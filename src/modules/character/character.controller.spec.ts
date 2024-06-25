import { AuthGuard } from '../auth/auth.guard';
import { CharacterController } from './character.controller';
import { CharacterRepository } from './character.repository';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { FindOneParams } from '../find-one.params';
import { GetCharacterDto } from './dto/get-character.dto';
import { plainToInstance } from 'class-transformer';
import { RoleGuard } from '../auth/role.guard';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { JwtService } from '@nestjs/jwt';

describe('CharacterController', () => {
  let controller: CharacterController;
  let service: CharacterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharacterController],
      providers: [
        CharacterService,
        {
          provide: AuthGuard,
          useValue: {
            canActivate: jest.fn(() => true),
          },
        },
        {
          provide: RoleGuard,
          useValue: {
            canActivate: jest.fn(() => true),
          },
        },
        {
          provide: CharacterRepository,
          useValue: {
            canActivate: jest.fn(() => true),
          },
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CharacterController>(CharacterController);
    service = module.get<CharacterService>(CharacterService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new character', async () => {
      const createCharacterDto: CreateCharacterDto = { name: 'Test Character' };
      const createdCharacter = { id: 1, name: 'Test Character' };

      jest.spyOn(service, 'create').mockResolvedValue(createdCharacter as any);

      const result = await controller.create(createCharacterDto, { url: '/character' } as any);
      expect(result).toEqual(plainToInstance(GetCharacterDto, createdCharacter));
    });
  });

  describe('findOne', () => {
    it('should return a character', async () => {
      const character = { id: 1, name: 'Test Character' };

      jest.spyOn(service, 'get').mockResolvedValue(character as any);

      const result = await controller.findOne(
        { id: 1 } as FindOneParams,
        { url: '/character/1' } as any
      );
      expect(result).toEqual(plainToInstance(GetCharacterDto, character));
    });
  });

  describe('getAll', () => {
    it('should return an array of characters', async () => {
      const characters = [
        { id: 1, name: 'Character 1' },
        { id: 2, name: 'Character 2' },
      ];

      jest.spyOn(service, 'getAll').mockResolvedValue(characters as any);

      const result = await controller.getAll({ url: '/character' } as any);
      expect(result).toEqual(plainToInstance(GetCharacterDto, characters));
    });
  });

  describe('update', () => {
    it('should update a character', async () => {
      const updateCharacterDto: UpdateCharacterDto = { id: 1, name: 'Updated Character' };
      const updatedCharacter = { id: 1, name: 'Updated Character' };

      jest.spyOn(service, 'update').mockResolvedValue(updatedCharacter as any);

      const result = await controller.update(updateCharacterDto, { url: '/character' } as any);
      expect(result).toEqual(plainToInstance(GetCharacterDto, updatedCharacter));
    });
  });

  describe('delete', () => {
    it('should delete a character', async () => {
      const response = {
        statusCode: 200,
        toJson: jest.fn().mockReturnValue({ message: 'Personagem deletado com sucesso' }),
      };

      jest.spyOn(service, 'delete').mockResolvedValue(response as any);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await controller.delete({ id: 1 } as FindOneParams, res, { url: '/character/1' } as any);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Personagem deletado com sucesso' });
    });
  });
});
