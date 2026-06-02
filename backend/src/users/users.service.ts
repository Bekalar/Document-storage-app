import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserProfileEntity } from './user-profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(UserProfileEntity)
    private readonly profileRepository: Repository<UserProfileEntity>,
  ) { }

  async getAll() {
    return await UserEntity.findAllUsers();
  }

  async findUser(login: string) {
    if (!login) {
      return null;
    }
    return await this.userRepository.findOneBy({ login });
  }

  create(login: string, password: string) {
    const user = this.userRepository.create({ login, credentials: { passwordHash: password } });
    return this.userRepository.save(user);
  }

  async update(login: string, attrs: Partial<Pick<UserEntity, 'isActive'>>) {
    const user = await this.findUser(login);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return this.userRepository.save(user);
  }

  async remove(login: string) {
    const user = await this.findUser(login);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.remove(user);
  }

  async updateProfile(
    login: string,
    profileAttrs: { firstName?: string; lastName?: string; location?: string }
  ) {
    const user = await this.findUser(login);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let profile = await this.profileRepository.findOne({
      where: { user: { id: user.id } },
    });

    if (!profile) {
      profile = this.profileRepository.create({ user });
    }

    Object.assign(profile, profileAttrs);
    return await this.profileRepository.save(profile);
  }
}
