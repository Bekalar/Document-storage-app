import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteEntity } from './route/route.entity';
import { RoutesController } from './route/route.controller';
import { RoutesService } from './route/route.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [RouteEntity],
      synchronize: false,
    }),
  ],
  controllers: [AppController, RoutesController],
  providers: [RoutesService],
})

export class AppModule { }
