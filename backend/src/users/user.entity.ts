import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { UserProfileEntity } from './user-profile.entity';
import { UserCredentialsEntity } from './user-credentials.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'char', length: 5, unique: true,
    transformer: {
      to: (value: string) => value,
      from: (value: string) => value ? value.trim() : value,
    },
  })
  login: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @OneToOne(() => UserCredentialsEntity, (credentials) => credentials.user, { cascade: true })
  credentials: UserCredentialsEntity;

  @OneToOne(() => UserProfileEntity, (profile) => profile.user, { cascade: true })
  profile: UserProfileEntity;

  static async findAllUsers() {
    return await this.find({
      order: {
        login: 'ASC'
      }
    });
  }
}
