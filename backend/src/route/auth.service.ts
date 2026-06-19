import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) { }

  async signup(login: string, password: string) {
    const existingUsers = await this.userService.findUser(login);
    if (existingUsers) {
      throw new BadRequestException('User with this login already exists');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const user = await this.userService.create(login, result);

    return user;
  }

  async signin(login: string, password: string) {
    const user = await this.userService.findUser(login);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.credentials.passwordHash.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Wrong password');
    }

    return user;
  }
}
