import { Injectable, NotFoundException } from '@nestjs/common';
import { RouteEntity } from './route.entity';

@Injectable()
export class RoutesService {
  async getAll() {
    return await RouteEntity.findAllRoutes();
  }

  async getOne(id: number) {
    if (!id) {
      return null;
    }
    return await RouteEntity.findOneBy({ id });
  }

  async create(name: string, route: string, icon: string) {
    const routeData = RouteEntity.create({ name, route, icon });

    return RouteEntity.save(routeData);
  }

  async update(id: number, attrs: Partial<RouteEntity>) {
    const routeData = await RouteEntity.findOneBy({ id });
    if (!routeData) {
      throw new NotFoundException('Route not found');
    }
    Object.assign(routeData, attrs);

    return RouteEntity.save(routeData);
  }

  async remove(id: number) {
    const routeData = await RouteEntity.findOneBy({ id });
    if (!routeData) {
      throw new NotFoundException('Route not found');
    }

    return RouteEntity.remove(routeData);
  }
}
