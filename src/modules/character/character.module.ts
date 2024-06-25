import { CharacterController } from './character.controller';
import { CharacterRepository } from './character.repository';
import { CharacterService } from './character.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from '@/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CharacterService, CharacterRepository],
  controllers: [CharacterController],
  exports: [CharacterService],
})
export class CharacterModule {}
