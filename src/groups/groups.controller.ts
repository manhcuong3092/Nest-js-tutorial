import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AddUserToGroupDto } from './dtos/addUserToGroup.dto';
import { CreateGroupDto } from './dtos/createGroup.dto';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private groupService: GroupsService) {}

  @Get()
  async getAllGroups() {
    return await this.groupService.findAllGroup();
  }

  @Get(':id')
  async getOneGroup(@Param('id', ParseIntPipe) id: number) {
    return await this.groupService.findById(id);
  }

  @Post()
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    return await this.groupService.createGroup(createGroupDto);
  }

  @Post(':id')
  async addUserToGroup(
    @Param('id', ParseIntPipe) id: number,
    @Body() addUserToGroup: AddUserToGroupDto,
  ) {
    return await this.groupService.addUserToGroup(id, addUserToGroup);
  }
}
