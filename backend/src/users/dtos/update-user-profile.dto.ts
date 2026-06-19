import { IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Imię nie może być dłuższe niż 100 znaków' })
  firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Nazwisko nie może być dłuższe niż 100 znaków' })
  lastName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Lokalizacja nie może być dłuższa niż 255 znaków' })
  location?: string;
}
