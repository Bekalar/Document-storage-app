import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserProfileEntity } from './user-profile.entity';
import { UserCredentialsEntity } from './user-credentials.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(UserProfileEntity)
    private readonly profileRepository: Repository<UserProfileEntity>,

    @InjectRepository(UserCredentialsEntity)
    private readonly credentialsRepository: Repository<UserCredentialsEntity>
  ) { }

  async getAll() {
    return await this.userRepository.find({
      order: {
        login: 'ASC'
      }
    });
  }

  async findUser(login: string) {
    if (!login) {
      return null;
    }
    return await this.userRepository.findOneBy({ login });
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.userRepository.findOneBy({ id });
  }

  async create(login: string, password: string) {
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

  async updatePassword(login: string, newPasswordHash: string) {
    const user = await this.userRepository.findOne({
      where: { login },
      relations: ['credentials']
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.credentials) {
      user.credentials = this.credentialsRepository.create({ passwordHash: newPasswordHash });
      user.credentials.user = user;
    } else {
      user.credentials.passwordHash = newPasswordHash;
    }

    return await this.userRepository.save(user);
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
