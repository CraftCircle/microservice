import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { PrismaService } from '@app/prisma/prisma.service';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UserService, PrismaService, UsersResolver],
  exports: [UserService]
})
export class UsersModule {}
