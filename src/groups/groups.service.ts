import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/entities/group';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';
import { AddUserToGroupDto } from './dtos/addUserToGroup.dto';
import { CreateGroupDto } from './dtos/createGroup.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAllGroup(): Promise<Group[]> {
    return await this.groupRepository.find({ relations: ['users'] });
  }

  async findById(id: number): Promise<Group> {
    return await this.groupRepository.findOneBy({ id });
  }

  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    const newGroup = this.groupRepository.create({ ...createGroupDto });
    return await this.groupRepository.save(newGroup);
  }

  async addUserToGroup(id, addUserToGroup: AddUserToGroupDto) {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['users'],
    });
    if (!group) throw new BadRequestException('Cannot find group');
    const user = await this.userRepository.findOneBy({
      id: addUserToGroup.userId,
    });
    if (!user) throw new BadRequestException('Cannot find user');
    console.log(group);
    group.users.push(user);

    this.groupRepository.save(group);
  }
}
