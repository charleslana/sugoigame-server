import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { SocketModule } from './modules/socket/socket.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
import { ValidationInterceptor } from './helpers/interceptor/ValidationInterceptor';
import { CharacterModule } from './modules/character/character.module';
import { CharacterController } from './modules/character/character.controller';
import { AvatarModule } from './modules/avatar/avatar.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ThrottlerModule.forRoot([
      {
        ttl: 1 * 60000,
        limit: 100,
      },
    ]),
    SocketModule,
    CharacterModule,
    AvatarModule,
  ],
  controllers: [AppController, UserController, CharacterController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ValidationInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
