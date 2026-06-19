import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutesController } from './route.controller';
import { RoutesService } from './route.service';
import { RouteEntity } from './route.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RouteEntity
    ]),],
  controllers: [RoutesController],
  providers: [RoutesService],
  exports: [RoutesService]
})

export class RoutesModule { }
