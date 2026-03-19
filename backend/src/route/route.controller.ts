import { Controller, Get } from '@nestjs/common';
import { RoutesService } from './route.service';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) { }

  @Get('/')
  async findAll() {
    const routes = await this.routesService.getRoutes();

    return {
      navigation: routes,
    };
  }
}
