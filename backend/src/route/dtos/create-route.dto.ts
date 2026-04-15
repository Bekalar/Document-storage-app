import { IsString } from 'class-validator';

export class CreateRouteDto {
  @IsString()
  name: string;

  @IsString()
  route: string;

  @IsString()
  icon: string;
}
