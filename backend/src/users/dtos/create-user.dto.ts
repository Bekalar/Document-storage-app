import { IsString, IsStrongPassword, Length, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim().toUpperCase())
  @Length(5, 5, { message: 'Login musi mieć 5 znaków' })
  login: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: 'Hasło musi zawierać min. 8 znaków, w tym wielką literę, cyfrę i znak specjalny' }
  )
  password: string;
}
