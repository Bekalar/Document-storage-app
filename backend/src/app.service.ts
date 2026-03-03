import { Injectable } from '@nestjs/common';
import { RouteEntity } from './route.entity';

@Injectable()
export class AppService {
  async getRoutes() {
    return await RouteEntity.findAllRoutes();
  }
}
