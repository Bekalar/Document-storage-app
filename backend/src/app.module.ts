import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { RouteEntity } from './route/route.entity';
import { RoutesController } from './route/route.controller';
import { RoutesService } from './route/route.service';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/user.entity';
import { UserProfileEntity } from './users/user-profile.entity';
import { UserCredentialsEntity } from './users/user-credentials.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    UsersModule,

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [RouteEntity, UserEntity, UserProfileEntity, UserCredentialsEntity],
        synchronize: false,
      }),
    }),
  ],
  controllers: [AppController, RoutesController],
  providers: [RoutesService],
})

export class AppModule { }
