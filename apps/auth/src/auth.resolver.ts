import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Public } from './decorators/public.decorator';
import { LoginRequestDTO } from './dto/login-request.dto';
import { RegisterRequestDTO } from './dto/register-request.dto';
import { LoginResponseDTO } from './dto/login-response.dto';
import { RegisterResponseDTO } from './dto/register-response.dto';
import { firstValueFrom } from 'rxjs';

@Resolver()
export class AuthResolver {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Public()
  @Mutation(() => RegisterResponseDTO)
  async register(
    @Args('registerInput') registerInput: RegisterRequestDTO,
  ): Promise<RegisterResponseDTO> {
    return firstValueFrom(this.authClient.send('auth_register', registerInput));
  }

  @Public()
  @Mutation(() => LoginResponseDTO)
  async login(
    @Args('loginInput') loginInput: LoginRequestDTO,
  ): Promise<LoginResponseDTO> {
    return firstValueFrom(this.authClient.send('auth_login', loginInput));
  }
}
