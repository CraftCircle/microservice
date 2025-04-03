import { UserEntity } from '@app/users/entities/user.entity';
import { AccessToken } from '../types/AccessToken';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class RegisterResponseDTO implements AccessToken {
  @Field()
  access_token: string;
  @Field(() => UserEntity)
  user: Partial<UserEntity>;
}
