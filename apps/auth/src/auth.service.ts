import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RegisterRequestDTO } from './dto/register-request.dto';
import { LoginRequestDTO } from './dto/login-request.dto';
import { LoginResponseDTO } from './dto/login-response.dto';
import { RegisterResponseDTO } from './dto/register-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await firstValueFrom(
      this.userClient.send({ cmd: 'get-user-by-email' }, email),
    );

    if (!user) throw new BadRequestException('User not found');

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) throw new BadRequestException('Invalid credentials');

    return user;
  }

  async login(loginInput: LoginRequestDTO): Promise<LoginResponseDTO> {
    const user = await this.validateUser(loginInput.email, loginInput.password);

    const payload = { email: user.email, sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  }

  async register(input: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const existing = await firstValueFrom(
      this.userClient.send({ cmd: 'get-user-by-email' }, input.email),
    );

    if (existing) throw new BadRequestException('Email already exists');

    const password = await bcrypt.hash(input.password, 10);

    const newUser = await firstValueFrom(
      this.userClient.send(
        { cmd: 'create-user' },
        {
          ...input,
          password,
        },
      ),
    );

    const token = this.jwtService.sign({
      email: newUser.email,
      id: newUser.id,
      role: newUser.role,
    });

    return {
      access_token: token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
    };
  }
}
