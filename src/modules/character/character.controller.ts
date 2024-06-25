import { AuthGuard } from '../auth/auth.guard';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { FindOneParams } from '../find-one.params';
import { GetCharacterDto } from './dto/get-character.dto';
import { plainToInstance } from 'class-transformer';
import { Request as ERequest } from 'express';
import { Response } from 'express';
import { RoleEnum } from '@prisma/client';
import { RoleGuard } from '../auth/role.guard';
import { UpdateCharacterDto } from './dto/update-character.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Res,
  Request,
  UseGuards,
} from '@nestjs/common';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  private readonly logger = new Logger(CharacterController.name);

  @UseGuards(AuthGuard, new RoleGuard([RoleEnum.admin]))
  @Post()
  async create(@Body() createCharacterDto: CreateCharacterDto, @Request() req: ERequest) {
    this.logger.log(`create: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(createCharacterDto)}`);
    const create = await this.characterService.create(createCharacterDto);
    return plainToInstance(GetCharacterDto, create);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param() params: FindOneParams, @Request() req: ERequest) {
    this.logger.log(`findOne: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(params)}`);
    const { id } = params;
    const get = await this.characterService.get(id);
    return plainToInstance(GetCharacterDto, get);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAll(@Request() req: ERequest): Promise<GetCharacterDto[]> {
    this.logger.log(`getAll: Request made to ${req.url}`);
    const getAll = await this.characterService.getAll();
    return plainToInstance(GetCharacterDto, getAll);
  }

  @UseGuards(AuthGuard, new RoleGuard([RoleEnum.admin]))
  @Put()
  async update(@Body() updateCharacterDto: UpdateCharacterDto, @Request() req: ERequest) {
    this.logger.log(`update: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(updateCharacterDto)}`);
    const update = await this.characterService.update(updateCharacterDto);
    return plainToInstance(GetCharacterDto, update);
  }

  @UseGuards(AuthGuard, new RoleGuard([RoleEnum.admin]))
  @Delete(':id')
  async delete(@Param() params: FindOneParams, @Res() res: Response, @Request() req: ERequest) {
    this.logger.log(`delete: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(params)}`);
    const { id } = params;
    const response = await this.characterService.delete(id);
    return res.status(response.statusCode).json(response.toJson());
  }
}
