import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouteEntity } from './route.entity';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(RouteEntity)
    private readonly routeRepository: Repository<RouteEntity>,
  ) { }

  async getAll() {
    return await this.routeRepository.find({
      order: {
        routeOrder: 'ASC',
        id: 'ASC'
      }
    });
  }

  async getOne(id: number) {
    if (!id) {
      return null;
    }
    return await this.routeRepository.findOneBy({ id });
  }

  async create(name: string, route: string, icon: string) {
    const routeData = this.routeRepository.create({ name, route, icon });

    return this.routeRepository.save(routeData);
  }

  async update(id: number, attrs: Partial<RouteEntity>) {
    const routeData = await this.routeRepository.findOneBy({ id });
    if (!routeData) {
      throw new NotFoundException('Route not found');
    }
    Object.assign(routeData, attrs);

    return this.routeRepository.save(routeData);
  }

  async remove(id: number) {
    const routeData = await this.routeRepository.findOneBy({ id });
    if (!routeData) {
      throw new NotFoundException('Route not found');
    }

    return RouteEntity.remove(routeData);
  }
}
