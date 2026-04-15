import { IsString, IsOptional } from 'class-validator';

export class UpdateRouteDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  route: string;

  @IsString()
  @IsOptional()
  icon: string;
}
