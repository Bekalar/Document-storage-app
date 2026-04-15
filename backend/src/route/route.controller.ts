import { Controller, Get, Patch, Post, Delete, Param, Body } from '@nestjs/common';
import { RoutesService } from './route.service';
import { CreateRouteDto } from './dtos/create-route.dto';
import { UpdateRouteDto } from './dtos/update-route.dto';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) { }

  @Get()
  async findAll() {
    const routes = await this.routesService.getAll();

    return {
      navigation: routes,
    };
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    const routeData = await this.routesService.getOne(id);

    return {
      route: routeData,
    };
  }

  @Post()
  async createRoute(@Body() body: CreateRouteDto) {
    const routeData = await this.routesService.create(body.name, body.route, body.icon);

    return {
      route: routeData,
    }
  }

  @Patch('/:id')
  async updateRoute(@Param('id') id: string, @Body() body: UpdateRouteDto) {
    const routeData = await this.routesService.update(parseInt(id), body)

    return {
      route: routeData,
    }
  }

  @Delete('/:id')
  async deleteRoute(@Param('id') id: string) {
    const routeData = await this.routesService.remove(parseInt(id));

    return {
      route: routeData,
    }
  }
}
