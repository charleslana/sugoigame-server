import { AvatarController } from './avatar.controller';
import { AvatarRepository } from './avatar.repository';
import { AvatarService } from './avatar.service';
import { CharacterRepository } from '../character/character.repository';
import { CharacterService } from '../character/character.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from '@/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AvatarService, AvatarRepository, CharacterService, CharacterRepository],
  controllers: [AvatarController],
})
export class AvatarModule {}
