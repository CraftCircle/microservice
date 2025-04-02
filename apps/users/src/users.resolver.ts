import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserService } from './users.service';
import { UserEntity } from './entities/user.entity';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(() => [UserEntity])
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Query(() => UserEntity, { nullable: true })
  async getUserByEmail(@Args('email') email: string) {
    return this.usersService.findOne(email);
  }
}