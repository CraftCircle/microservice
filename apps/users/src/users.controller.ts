import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @MessagePattern({ cmd: 'get-user-by-email' })
  async findByEmail(@Payload() email: string) {
    return this.usersService.findOne(email);
  }

  @MessagePattern({ cmd: 'create-user' })
  async createUser(@Payload() data: any) {
    return this.usersService.createUser(data);
  }
}
