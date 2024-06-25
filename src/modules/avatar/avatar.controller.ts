import { AuthGuard } from '../auth/auth.guard';
import { AvatarService } from './avatar.service';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { FindOneParams } from '../find-one.params';
import { GetAvatarDto } from './dto/get-avatar.dto';
import { plainToInstance } from 'class-transformer';
import { Request as ERequest } from 'express';
import { Response } from 'express';
import { RoleEnum } from '@prisma/client';
import { RoleGuard } from '../auth/role.guard';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
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

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  private readonly logger = new Logger(AvatarController.name);

  @UseGuards(AuthGuard, new RoleGuard([RoleEnum.admin]))
  @Post()
  async create(@Body() createAvatarDto: CreateAvatarDto, @Request() req: ERequest) {
    this.logger.log(`create: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(createAvatarDto)}`);
    const create = await this.avatarService.create(createAvatarDto);
    return plainToInstance(GetAvatarDto, create);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param() params: FindOneParams, @Request() req: ERequest) {
    this.logger.log(`findOne: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(params)}`);
    const { id } = params;
    const get = await this.avatarService.get(id);
    return plainToInstance(GetAvatarDto, get);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAll(@Request() req: ERequest): Promise<GetAvatarDto[]> {
    this.logger.log(`getAll: Request made to ${req.url}`);
    const getAll = await this.avatarService.getAll();
    return plainToInstance(GetAvatarDto, getAll);
  }

  @UseGuards(AuthGuard, new RoleGuard([RoleEnum.admin]))
  @Put()
  async update(@Body() updateAvatarDto: UpdateAvatarDto, @Request() req: ERequest) {
    this.logger.log(`update: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(updateAvatarDto)}`);
    const update = await this.avatarService.update(updateAvatarDto);
    return plainToInstance(GetAvatarDto, update);
  }

  @UseGuards(AuthGuard, new RoleGuard([RoleEnum.admin]))
  @Delete(':id')
  async delete(@Param() params: FindOneParams, @Res() res: Response, @Request() req: ERequest) {
    this.logger.log(`delete: Request made to ${req.url}`);
    this.logger.log(`Data sent: ${JSON.stringify(params)}`);
    const { id } = params;
    const response = await this.avatarService.delete(id);
    return res.status(response.statusCode).json(response.toJson());
  }
}
