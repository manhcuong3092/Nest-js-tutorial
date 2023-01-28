import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post';
import { Profile } from 'src/entities/profile';
import { Repository } from 'typeorm';
import { User } from '../entities/user';
import {
  CreateUserParams,
  CreateUserPostParams,
  CreateUserProfileParams,
  UpdateUserParams,
} from './utils/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileReopsitory: Repository<Profile>,
    @InjectRepository(Post) private postReopsitory: Repository<Post>,
  ) {}

  async fetchUsers(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['profile', 'posts'] });
  }

  async findOne(username: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ username });
  }

  async createUser(userDetails: CreateUserParams): Promise<User> {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return await this.userRepository.save(newUser);
  }

  async updateUser(
    id: number,
    updateUserDetails: UpdateUserParams,
  ): Promise<void> {
    await this.userRepository.update({ id }, { ...updateUserDetails });
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async createUserProfile(
    id: number,
    createUserProfileDetails: CreateUserProfileParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );
    const newProfile = this.profileReopsitory.create(createUserProfileDetails);
    const savedProfile = await this.profileReopsitory.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  async createUserPost(
    id: number,
    createUserPostDetails: CreateUserPostParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );
    const newPost = this.postReopsitory.create({
      ...createUserPostDetails,
      user,
    });
    return await this.postReopsitory.save(newPost);
  }
}
