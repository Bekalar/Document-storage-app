import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { UserProfileEntity } from './user-profile.entity';
import { UserCredentialsEntity } from './user-credentials.entity';
import { AuthService } from '../route/auth.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserProfileEntity,
      UserCredentialsEntity
    ]),],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService, AuthService]
})

export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
