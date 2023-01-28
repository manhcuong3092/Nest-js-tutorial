import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { UseFilters } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/enums/role.enum';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateUserDto } from './dtos/createUser.dto';
import { CreateUserPostDto } from './dtos/createUserPost.dto';
import { CreateUserProfileDto } from './dtos/createUserProfileDto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { ValidateCreateUserPipe } from './pipes/validate-create-user.pipe';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getUsers() {
    return this.usersService.fetchUsers();
  }

  // @UseFilters(HttpExceptionFilter)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) createUserDto: CreateUserDto) {
    try {
      return this.usersService.createUser(createUserDto);
    } catch (exception) {
      throw new BadRequestException();
    }
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.deleteUser(id);
  }

  @Post(':id/profiles')
  async createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return await this.usersService.createUserProfile(id, createUserProfileDto);
  }

  @Post(':id/post')
  async createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return await this.usersService.createUserPost(id, createUserPostDto);
  }
}
