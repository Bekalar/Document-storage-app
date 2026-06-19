import { Controller, Get, Patch, Post, Delete, Param, Body, UsePipes, Session } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../route/auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { customValidationPipe } from '../pipes/validation.config';
import { UpdateProfileDto } from './dtos/update-user-profile.dto';

@Controller('users')
@UsePipes(customValidationPipe)
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  @Post('/signup')
  async signup(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.login, body.password);
    session.userId = user.id;

    return { user };
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.login, body.password);
    session.userId = user.id;

    return { user };
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get()
  async findAll() {
    const users = await this.usersService.getAll();

    return {
      users: users
    };
  }

  @Get('/:id')
  async findOne(@Param('id') login: string) {
    const user = await this.usersService.findUser(login);

    return {
      user: user,
    };
  }

  @Patch('/:login/profile')
  async updateProfile(@Param('login') login: string, @Body() body: UpdateProfileDto) {
    return await this.usersService.updateProfile(login, body);
  }

  @Delete('/:login')
  async remove(@Param('login') login: string) {
    return await this.usersService.remove(login);
  }
}
