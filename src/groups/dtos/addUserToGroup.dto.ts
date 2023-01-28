import { IsNotEmpty } from 'class-validator';

export class AddUserToGroupDto {
  @IsNotEmpty()
  userId: number;
}
