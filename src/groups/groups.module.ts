import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/entities/group';
import { User } from 'src/entities/user';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
