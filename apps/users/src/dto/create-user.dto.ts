import { InputType, Field } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Name of the user' })
  name: string;

  @Field(() => String, { description: 'Email of the user' })
  email: string;

  @Field(() => String, { description: 'Password of the user', nullable: true })
  password?: string; // Optional, as it's not required for Google OAuth users

  @Field(() => Role, {
    description: 'Role of the user',
    defaultValue: Role.USER,
  })
  role: Role;


}
